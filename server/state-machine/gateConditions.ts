// Pure condition evaluators — no side effects, no DB calls.
// All operate on a ProjectSnapshot so they can be unit-tested in isolation.

export type GateConditionResult = {
  met: boolean
  label: string
  detail: string
}

export type ProjectSnapshot = {
  depositClearedAt: Date | null
  quotations: Array<{ status: string; signedAt: Date | null }>
  variations: Array<{ approved: boolean; signedAt: Date | null }>
  activeStageQCChecklists: Array<{ isComplete: boolean; title: string }>
  punchListItems: Array<{ resolved: boolean }>
  invoices: Array<{
    isFinalInvoice: boolean
    status: string
    paidAt: Date | null
  }>
}

export function checkMobilizationGate(s: ProjectSnapshot): GateConditionResult[] {
  const signedQuote = s.quotations.find((q) => q.status === 'SIGNED' && q.signedAt !== null)
  return [
    {
      met: s.depositClearedAt !== null,
      label: 'Deposit Cleared',
      detail: s.depositClearedAt
        ? `Cleared ${s.depositClearedAt.toLocaleDateString()}`
        : 'Deposit payment not yet confirmed',
    },
    {
      met: !!signedQuote,
      label: 'Quotation Signed',
      detail: signedQuote
        ? `Signed ${signedQuote.signedAt?.toLocaleDateString()}`
        : 'No signed quotation on file',
    },
  ]
}

export function checkProcurementGate(s: ProjectSnapshot): GateConditionResult[] {
  return [
    {
      met: s.depositClearedAt !== null,
      label: 'Deposit Cleared',
      detail:
        s.depositClearedAt !== null
          ? 'Deposit confirmed — PO issuance permitted'
          : 'Deposit must be cleared before issuing Purchase Orders',
    },
  ]
}

export function checkConstructionStageGate(s: ProjectSnapshot): GateConditionResult[] {
  const total = s.activeStageQCChecklists.length
  const complete = s.activeStageQCChecklists.filter((c) => c.isComplete).length
  return [
    {
      met: total > 0 && complete === total,
      label: 'Stage QC Checklists Complete',
      detail:
        total === 0
          ? 'No QC checklists assigned to current stage'
          : `${complete} of ${total} checklists signed off`,
    },
  ]
}

export function checkHandoverGate(s: ProjectSnapshot): GateConditionResult[] {
  const total = s.punchListItems.length
  const resolved = s.punchListItems.filter((p) => p.resolved).length
  const pct = total === 0 ? 100 : Math.round((resolved / total) * 100)

  const unsignedVariations = s.variations.filter((v) => v.approved && !v.signedAt)

  return [
    {
      met: pct === 100,
      label: 'Punch List 100% Resolved',
      detail: `${resolved}/${total} items resolved (${pct}%)`,
    },
    {
      met: unsignedVariations.length === 0,
      label: 'All Variations Signed',
      detail:
        unsignedVariations.length === 0
          ? 'All approved variations have client signatures'
          : `${unsignedVariations.length} variation(s) awaiting client signature`,
    },
  ]
}

export function checkCloseoutGate(s: ProjectSnapshot): GateConditionResult[] {
  const finalInvoice = s.invoices.find((i) => i.isFinalInvoice)
  return [
    {
      met: finalInvoice?.status === 'PAID' && finalInvoice?.paidAt !== null,
      label: 'Final Payment Received',
      detail: finalInvoice
        ? finalInvoice.status === 'PAID'
          ? `Final invoice paid on ${finalInvoice.paidAt?.toLocaleDateString()}`
          : `Final invoice status: ${finalInvoice.status}`
        : 'No final invoice has been issued',
    },
  ]
}
