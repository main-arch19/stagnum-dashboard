import { PrismaClient } from '@prisma/client'

type AuditParams = {
  userId: string
  projectId?: string
  entity: string
  entityId: string
  action: string
  oldValue?: object | null
  newValue?: object | null
  reason?: string
  ipAddress?: string
}

export const auditService = {
  async log(db: PrismaClient, params: AuditParams): Promise<void> {
    await db.auditLog.create({
      data: {
        userId: params.userId,
        projectId: params.projectId,
        entity: params.entity,
        entityId: params.entityId,
        action: params.action,
        oldValue: params.oldValue ?? undefined,
        newValue: params.newValue ?? undefined,
        reason: params.reason,
        ipAddress: params.ipAddress,
      },
    })
  },
}
