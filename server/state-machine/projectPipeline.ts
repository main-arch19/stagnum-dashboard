import { PrismaClient, ProjectStage, GateStatus } from '@prisma/client'
import { TRPCError } from '@trpc/server'
import {
  type GateConditionResult,
  type ProjectSnapshot,
  checkMobilizationGate,
  checkProcurementGate,
  checkConstructionStageGate,
  checkHandoverGate,
  checkCloseoutGate,
} from './gateConditions'
import { auditService } from '../services/auditService'
import { GATE_OVERRIDE_MIN_REASON_CHARS } from '@/lib/constants'

export type GateName = 'MOBILIZATION' | 'PROCUREMENT' | 'CONSTRUCTION' | 'HANDOVER' | 'CLOSEOUT'

export type GateEvaluation = {
  gate: GateName
  status: GateStatus
  conditions: GateConditionResult[]
  allMet: boolean
}

const STAGE_ORDER: ProjectStage[] = [
  'ENQUIRY',
  'QUOTING',
  'AWAITING_SIGNATURE',
  'AWAITING_DEPOSIT',
  'MOBILIZATION',
  'PROCUREMENT',
  'CONSTRUCTION',
  'HANDOVER',
  'CLOSEOUT',
  'CLOSED',
]

const STAGE_GATE_MAP: Partial<Record<ProjectStage, GateName>> = {
  MOBILIZATION: 'MOBILIZATION',
  PROCUREMENT: 'PROCUREMENT',
  CONSTRUCTION: 'CONSTRUCTION',
  HANDOVER: 'HANDOVER',
  CLOSEOUT: 'CLOSEOUT',
}

const GATE_FIELD_MAP: Record<GateName, string> = {
  MOBILIZATION: 'mobilizationGate',
  PROCUREMENT: 'procurementGate',
  CONSTRUCTION: 'constructionGate',
  HANDOVER: 'handoverGate',
  CLOSEOUT: 'closeoutGate',
}

export class ProjectPipelineStateMachine {
  constructor(private db: PrismaClient) {}

  async buildSnapshot(projectId: string): Promise<ProjectSnapshot> {
    const [project, quotations, variations, checklists, punchList, invoices] = await Promise.all([
      this.db.project.findUniqueOrThrow({ where: { id: projectId } }),
      this.db.quotation.findMany({ where: { projectId } }),
      this.db.variation.findMany({ where: { projectId } }),
      this.db.qCChecklist.findMany({ where: { projectId } }),
      this.db.punchListItem.findMany({ where: { projectId } }),
      this.db.invoice.findMany({ where: { projectId } }),
    ])

    return {
      depositClearedAt: project.depositClearedAt,
      quotations: quotations.map((q) => ({ status: q.status, signedAt: q.signedAt })),
      variations: variations.map((v) => ({ approved: v.approved, signedAt: v.signedAt })),
      activeStageQCChecklists: checklists.map((c) => ({ isComplete: c.isComplete, title: c.title })),
      punchListItems: punchList.map((p) => ({ resolved: p.resolved })),
      invoices: invoices.map((i) => ({
        isFinalInvoice: i.isFinalInvoice,
        status: i.status,
        paidAt: i.paidAt,
      })),
    }
  }

  async evaluateAllGates(projectId: string): Promise<GateEvaluation[]> {
    const [project, snapshot] = await Promise.all([
      this.db.project.findUniqueOrThrow({ where: { id: projectId } }),
      this.buildSnapshot(projectId),
    ])

    const defs: Array<{ name: GateName; conditions: GateConditionResult[]; field: keyof typeof project }> = [
      { name: 'MOBILIZATION', conditions: checkMobilizationGate(snapshot), field: 'mobilizationGate' },
      { name: 'PROCUREMENT', conditions: checkProcurementGate(snapshot), field: 'procurementGate' },
      { name: 'CONSTRUCTION', conditions: checkConstructionStageGate(snapshot), field: 'constructionGate' },
      { name: 'HANDOVER', conditions: checkHandoverGate(snapshot), field: 'handoverGate' },
      { name: 'CLOSEOUT', conditions: checkCloseoutGate(snapshot), field: 'closeoutGate' },
    ]

    return defs.map((d) => ({
      gate: d.name,
      status: project[d.field] as GateStatus,
      conditions: d.conditions,
      allMet: d.conditions.every((c) => c.met),
    }))
  }

  async tryAdvance(
    projectId: string,
    userId: string
  ): Promise<{ advanced: boolean; newStage: ProjectStage; blockedBy: GateEvaluation | null }> {
    const project = await this.db.project.findUniqueOrThrow({ where: { id: projectId } })

    const currentIndex = STAGE_ORDER.indexOf(project.stage)
    if (currentIndex === -1 || currentIndex >= STAGE_ORDER.length - 1) {
      throw new TRPCError({ code: 'BAD_REQUEST', message: 'Project is at terminal stage' })
    }

    const nextStage = STAGE_ORDER[currentIndex + 1]
    const requiredGate = STAGE_GATE_MAP[nextStage]

    if (!requiredGate) {
      await this.db.project.update({ where: { id: projectId }, data: { stage: nextStage } })
      await auditService.log(this.db, {
        userId,
        projectId,
        entity: 'Project',
        entityId: projectId,
        action: 'STAGE_ADVANCE',
        oldValue: { stage: project.stage },
        newValue: { stage: nextStage },
      })
      return { advanced: true, newStage: nextStage, blockedBy: null }
    }

    const snapshot = await this.buildSnapshot(projectId)
    const conditionEvals: Record<GateName, GateConditionResult[]> = {
      MOBILIZATION: checkMobilizationGate(snapshot),
      PROCUREMENT: checkProcurementGate(snapshot),
      CONSTRUCTION: checkConstructionStageGate(snapshot),
      HANDOVER: checkHandoverGate(snapshot),
      CLOSEOUT: checkCloseoutGate(snapshot),
    }

    const conditions = conditionEvals[requiredGate]
    const allMet = conditions.every((c) => c.met)

    if (!allMet) {
      return {
        advanced: false,
        newStage: project.stage,
        blockedBy: { gate: requiredGate, status: GateStatus.LOCKED, conditions, allMet: false },
      }
    }

    await this.db.$transaction(async (tx) => {
      await tx.project.update({
        where: { id: projectId },
        data: { stage: nextStage, [GATE_FIELD_MAP[requiredGate]]: GateStatus.UNLOCKED },
      })
      await tx.stageGateEvent.create({
        data: {
          projectId,
          gate: requiredGate,
          previousStatus: GateStatus.LOCKED,
          newStatus: GateStatus.UNLOCKED,
          triggeredById: userId,
          isOverride: false,
          conditionSnapshot: conditions as object,
        },
      })
    })

    await auditService.log(this.db, {
      userId,
      projectId,
      entity: 'Project',
      entityId: projectId,
      action: 'STAGE_ADVANCE',
      oldValue: { stage: project.stage },
      newValue: { stage: nextStage },
    })

    return { advanced: true, newStage: nextStage, blockedBy: null }
  }

  async override(projectId: string, gate: GateName, founderId: string, reason: string): Promise<void> {
    if (!reason || reason.trim().length < GATE_OVERRIDE_MIN_REASON_CHARS) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: `Override reason must be at least ${GATE_OVERRIDE_MIN_REASON_CHARS} characters`,
      })
    }

    const snapshot = await this.buildSnapshot(projectId)
    const conditions = {
      MOBILIZATION: checkMobilizationGate(snapshot),
      PROCUREMENT: checkProcurementGate(snapshot),
      CONSTRUCTION: checkConstructionStageGate(snapshot),
      HANDOVER: checkHandoverGate(snapshot),
      CLOSEOUT: checkCloseoutGate(snapshot),
    }[gate]

    await this.db.$transaction(async (tx) => {
      await tx.project.update({
        where: { id: projectId },
        data: { [GATE_FIELD_MAP[gate]]: GateStatus.BYPASSED },
      })
      await tx.stageGateEvent.create({
        data: {
          projectId,
          gate,
          previousStatus: GateStatus.LOCKED,
          newStatus: GateStatus.BYPASSED,
          triggeredById: founderId,
          isOverride: true,
          overrideReason: reason.trim(),
          conditionSnapshot: conditions as object,
        },
      })
    })

    await auditService.log(this.db, {
      userId: founderId,
      projectId,
      entity: 'StageGate',
      entityId: projectId,
      action: 'GATE_OVERRIDE',
      oldValue: { gate, status: 'LOCKED' },
      newValue: { gate, status: 'BYPASSED', reason },
      reason,
    })
  }

  async requireProcurementGate(projectId: string): Promise<void> {
    const project = await this.db.project.findUniqueOrThrow({ where: { id: projectId } })
    if (project.procurementGate === GateStatus.LOCKED) {
      const snapshot = await this.buildSnapshot(projectId)
      const conditions = checkProcurementGate(snapshot)
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'Procurement Gate is locked. Deposit must be cleared before issuing Purchase Orders.',
        cause: conditions,
      })
    }
  }

  async requireCloseoutGate(projectId: string): Promise<void> {
    const snapshot = await this.buildSnapshot(projectId)
    const conditions = checkCloseoutGate(snapshot)
    if (!conditions.every((c) => c.met)) {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'Final payment has not been received. Report cannot be released until payment is confirmed.',
        cause: conditions,
      })
    }
  }
}
