// ─── Stagnum Sample Data ─────────────────────────────────────────────────────
// Realistic Jamaican construction context. Used by all dashboard pages until
// the database is connected.

// ── Projects ─────────────────────────────────────────────────────────────────
export type SampleProject = {
  id: string
  number: string
  name: string
  client: string
  stage: string
  contractValueJMD: number
  depositCleared: boolean
  pm: string
  pmInitials: string
  progressPct: number
  gates: { mob: boolean; proc: boolean; cons: boolean; hand: boolean; close: boolean }
  startDate: string
}

export const SAMPLE_PROJECTS: SampleProject[] = [
  {
    id: 'p1', number: 'STG-2026-001', name: 'Pemberton Family Residence',
    client: 'Neville Pemberton', stage: 'CONSTRUCTION', contractValueJMD: 48_500_000,
    depositCleared: true, pm: 'Marcus Reid', pmInitials: 'MR', progressPct: 62,
    gates: { mob: true, proc: true, cons: true, hand: false, close: false },
    startDate: '2026-01-10',
  },
  {
    id: 'p2', number: 'STG-2026-002', name: 'Half Moon Bay Hotel — Wing C',
    client: 'Half Moon Resort Ltd', stage: 'HANDOVER', contractValueJMD: 124_800_000,
    depositCleared: true, pm: 'Marcus Reid', pmInitials: 'MR', progressPct: 88,
    gates: { mob: true, proc: true, cons: true, hand: true, close: false },
    startDate: '2025-09-01',
  },
  {
    id: 'p3', number: 'STG-2026-003', name: 'Kingston Commercial Complex',
    client: 'Pinnacle Developments Ltd', stage: 'PROCUREMENT', contractValueJMD: 87_200_000,
    depositCleared: true, pm: 'Dionne Clarke', pmInitials: 'DC', progressPct: 40,
    gates: { mob: true, proc: true, cons: false, hand: false, close: false },
    startDate: '2026-02-15',
  },
  {
    id: 'p4', number: 'STG-2026-004', name: 'Ocho Rios Beachfront Villas',
    client: 'Sunrise Properties Ltd', stage: 'AWAITING_DEPOSIT', contractValueJMD: 62_300_000,
    depositCleared: false, pm: 'Dionne Clarke', pmInitials: 'DC', progressPct: 18,
    gates: { mob: false, proc: false, cons: false, hand: false, close: false },
    startDate: '2026-04-01',
  },
  {
    id: 'p5', number: 'STG-2026-005', name: 'UWI Mona Science Block Renovation',
    client: 'Univ. of the West Indies', stage: 'QUOTING', contractValueJMD: 34_700_000,
    depositCleared: false, pm: 'Marcus Reid', pmInitials: 'MR', progressPct: 8,
    gates: { mob: false, proc: false, cons: false, hand: false, close: false },
    startDate: '2026-05-01',
  },
  {
    id: 'p6', number: 'STG-2026-006', name: 'Portmore Retail Strip',
    client: 'Caribbean Retail Holdings', stage: 'ON_HOLD', contractValueJMD: 18_900_000,
    depositCleared: false, pm: 'Dionne Clarke', pmInitials: 'DC', progressPct: 25,
    gates: { mob: true, proc: false, cons: false, hand: false, close: false },
    startDate: '2025-11-01',
  },
  {
    id: 'p7', number: 'STG-2026-007', name: 'Mandeville Municipal Office',
    client: 'Manchester Parish Council', stage: 'ENQUIRY', contractValueJMD: 9_600_000,
    depositCleared: false, pm: 'Marcus Reid', pmInitials: 'MR', progressPct: 2,
    gates: { mob: false, proc: false, cons: false, hand: false, close: false },
    startDate: '2026-06-01',
  },
]

// ── Rates ─────────────────────────────────────────────────────────────────────
export type SampleRateCategory = { id: string; name: string; count: number }
export type SampleRate = {
  id: string; categoryId: string; code: string; description: string
  unit: string; rateJMD: number; rateUSD: number; version: number
  lastUpdated: string; staleDays: number
}

export const SAMPLE_RATE_CATEGORIES: SampleRateCategory[] = [
  { id: 'c1', name: 'Concrete Works', count: 7 },
  { id: 'c2', name: 'Steelwork & Rebar', count: 6 },
  { id: 'c3', name: 'Carpentry & Joinery', count: 6 },
  { id: 'c4', name: 'Electrical', count: 5 },
  { id: 'c5', name: 'Plumbing & Mechanical', count: 5 },
  { id: 'c6', name: 'Plant Hire', count: 5 },
  { id: 'c7', name: 'Labour (Direct)', count: 6 },
  { id: 'c8', name: 'Preliminary Items', count: 4 },
]

export const SAMPLE_RATES: SampleRate[] = [
  // Concrete Works
  { id: 'r1', categoryId: 'c1', code: 'CON-001', description: 'Mass concrete (1:2:4 mix)', unit: 'm³', rateJMD: 42_500, rateUSD: 274, version: 3, lastUpdated: '2026-02-15', staleDays: 80 },
  { id: 'r2', categoryId: 'c1', code: 'CON-002', description: 'Reinforced concrete slab (150mm)', unit: 'm²', rateJMD: 18_200, rateUSD: 117, version: 2, lastUpdated: '2025-11-20', staleDays: 167 },
  { id: 'r3', categoryId: 'c1', code: 'CON-003', description: 'Concrete column (300×300mm)', unit: 'lin.m', rateJMD: 24_600, rateUSD: 158, version: 4, lastUpdated: '2026-03-01', staleDays: 66 },
  { id: 'r4', categoryId: 'c1', code: 'CON-004', description: 'Concrete beam (230×460mm)', unit: 'lin.m', rateJMD: 19_800, rateUSD: 127, version: 2, lastUpdated: '2025-10-10', staleDays: 208 },
  { id: 'r5', categoryId: 'c1', code: 'CON-005', description: 'Strip footing (600×300mm)', unit: 'lin.m', rateJMD: 28_400, rateUSD: 183, version: 3, lastUpdated: '2026-01-05', staleDays: 121 },
  { id: 'r6', categoryId: 'c1', code: 'CON-006', description: 'Precast concrete fence panel', unit: 'nr', rateJMD: 8_500, rateUSD: 55, version: 1, lastUpdated: '2025-08-14', staleDays: 265 },
  { id: 'r7', categoryId: 'c1', code: 'CON-007', description: 'Concrete roof tile installation', unit: 'm²', rateJMD: 6_200, rateUSD: 40, version: 2, lastUpdated: '2026-04-01', staleDays: 35 },
  // Steelwork & Rebar
  { id: 'r8', categoryId: 'c2', code: 'STL-001', description: 'High-yield rebar 12mm dia', unit: 'tonne', rateJMD: 185_000, rateUSD: 1193, version: 5, lastUpdated: '2026-04-10', staleDays: 26 },
  { id: 'r9', categoryId: 'c2', code: 'STL-002', description: 'High-yield rebar 16mm dia', unit: 'tonne', rateJMD: 192_000, rateUSD: 1238, version: 5, lastUpdated: '2026-04-10', staleDays: 26 },
  { id: 'r10', categoryId: 'c2', code: 'STL-003', description: 'BRC fabric mesh A193', unit: 'm²', rateJMD: 3_400, rateUSD: 22, version: 3, lastUpdated: '2025-12-01', staleDays: 156 },
  { id: 'r11', categoryId: 'c2', code: 'STL-004', description: 'Structural steel I-beam (203×102)', unit: 'lin.m', rateJMD: 22_500, rateUSD: 145, version: 2, lastUpdated: '2026-02-20', staleDays: 75 },
  { id: 'r12', categoryId: 'c2', code: 'STL-005', description: 'Column base plate fabrication', unit: 'nr', rateJMD: 14_800, rateUSD: 95, version: 2, lastUpdated: '2026-01-15', staleDays: 111 },
  { id: 'r13', categoryId: 'c2', code: 'STL-006', description: 'Metal deck roofing (0.5mm)', unit: 'm²', rateJMD: 5_600, rateUSD: 36, version: 3, lastUpdated: '2026-03-20', staleDays: 47 },
  // Carpentry & Joinery
  { id: 'r14', categoryId: 'c3', code: 'CAR-001', description: 'Hardwood timber frame wall', unit: 'm²', rateJMD: 12_400, rateUSD: 80, version: 2, lastUpdated: '2026-01-20', staleDays: 106 },
  { id: 'r15', categoryId: 'c3', code: 'CAR-002', description: 'Solid mahogany door (900×2100)', unit: 'nr', rateJMD: 38_500, rateUSD: 248, version: 3, lastUpdated: '2026-03-05', staleDays: 62 },
  { id: 'r16', categoryId: 'c3', code: 'CAR-003', description: 'Louvre window (900×1200)', unit: 'nr', rateJMD: 14_200, rateUSD: 91, version: 2, lastUpdated: '2025-09-12', staleDays: 236 },
  { id: 'r17', categoryId: 'c3', code: 'CAR-004', description: 'Plywood soffit boarding (12mm)', unit: 'm²', rateJMD: 4_800, rateUSD: 31, version: 1, lastUpdated: '2026-02-01', staleDays: 94 },
  { id: 'r18', categoryId: 'c3', code: 'CAR-005', description: 'Built-in wardrobe (2400mm wide)', unit: 'nr', rateJMD: 62_000, rateUSD: 400, version: 2, lastUpdated: '2026-03-15', staleDays: 52 },
  { id: 'r19', categoryId: 'c3', code: 'CAR-006', description: 'Timber staircase with handrail', unit: 'flight', rateJMD: 145_000, rateUSD: 935, version: 3, lastUpdated: '2026-01-08', staleDays: 118 },
  // Electrical
  { id: 'r20', categoryId: 'c4', code: 'ELE-001', description: 'Main distribution board (200A)', unit: 'nr', rateJMD: 95_000, rateUSD: 612, version: 4, lastUpdated: '2026-04-05', staleDays: 31 },
  { id: 'r21', categoryId: 'c4', code: 'ELE-002', description: 'PVC conduit (20mm) installed', unit: 'lin.m', rateJMD: 1_850, rateUSD: 12, version: 3, lastUpdated: '2026-02-10', staleDays: 85 },
  { id: 'r22', categoryId: 'c4', code: 'ELE-003', description: 'Single duplex outlet', unit: 'nr', rateJMD: 4_200, rateUSD: 27, version: 3, lastUpdated: '2025-11-01', staleDays: 186 },
  { id: 'r23', categoryId: 'c4', code: 'ELE-004', description: 'LED recessed downlight (12W)', unit: 'nr', rateJMD: 6_800, rateUSD: 44, version: 2, lastUpdated: '2026-03-10', staleDays: 57 },
  { id: 'r24', categoryId: 'c4', code: 'ELE-005', description: 'Inverter AC split unit (12,000 BTU)', unit: 'nr', rateJMD: 145_000, rateUSD: 935, version: 2, lastUpdated: '2026-04-15', staleDays: 21 },
  // Plumbing
  { id: 'r25', categoryId: 'c5', code: 'PLB-001', description: 'CPVC pipe (25mm) with fittings', unit: 'lin.m', rateJMD: 2_400, rateUSD: 15, version: 3, lastUpdated: '2026-02-28', staleDays: 67 },
  { id: 'r26', categoryId: 'c5', code: 'PLB-002', description: 'WC suite (close-coupled)', unit: 'nr', rateJMD: 38_000, rateUSD: 245, version: 2, lastUpdated: '2025-10-15', staleDays: 203 },
  { id: 'r27', categoryId: 'c5', code: 'PLB-003', description: 'Basin (wall-hung, semi-ped)', unit: 'nr', rateJMD: 22_000, rateUSD: 142, version: 2, lastUpdated: '2026-01-20', staleDays: 106 },
  { id: 'r28', categoryId: 'c5', code: 'PLB-004', description: '500L plastic water tank installed', unit: 'nr', rateJMD: 48_000, rateUSD: 309, version: 3, lastUpdated: '2026-03-25', staleDays: 42 },
  { id: 'r29', categoryId: 'c5', code: 'PLB-005', description: 'Shower enclosure (900×900)', unit: 'nr', rateJMD: 68_000, rateUSD: 438, version: 1, lastUpdated: '2025-07-01', staleDays: 309 },
  // Plant Hire
  { id: 'r30', categoryId: 'c6', code: 'PLT-001', description: 'Excavator (20T) day rate', unit: 'day', rateJMD: 85_000, rateUSD: 548, version: 4, lastUpdated: '2026-04-01', staleDays: 35 },
  { id: 'r31', categoryId: 'c6', code: 'PLT-002', description: 'Concrete mixer (400L) day rate', unit: 'day', rateJMD: 18_000, rateUSD: 116, version: 3, lastUpdated: '2026-03-15', staleDays: 52 },
  { id: 'r32', categoryId: 'c6', code: 'PLT-003', description: 'Tower crane (32T) week rate', unit: 'week', rateJMD: 480_000, rateUSD: 3096, version: 2, lastUpdated: '2025-12-10', staleDays: 147 },
  { id: 'r33', categoryId: 'c6', code: 'PLT-004', description: 'Diesel generator (20kVA) day rate', unit: 'day', rateJMD: 22_000, rateUSD: 142, version: 3, lastUpdated: '2026-02-05', staleDays: 90 },
  { id: 'r34', categoryId: 'c6', code: 'PLT-005', description: 'Dump truck (10T) day rate', unit: 'day', rateJMD: 45_000, rateUSD: 290, version: 3, lastUpdated: '2026-01-28', staleDays: 98 },
  // Labour (Direct)
  { id: 'r35', categoryId: 'c7', code: 'LAB-001', description: 'Mason (skilled)', unit: 'day', rateJMD: 8_500, rateUSD: 55, version: 5, lastUpdated: '2026-04-01', staleDays: 35 },
  { id: 'r36', categoryId: 'c7', code: 'LAB-002', description: 'Carpenter (skilled)', unit: 'day', rateJMD: 8_000, rateUSD: 52, version: 5, lastUpdated: '2026-04-01', staleDays: 35 },
  { id: 'r37', categoryId: 'c7', code: 'LAB-003', description: 'Steel fixer (skilled)', unit: 'day', rateJMD: 9_000, rateUSD: 58, version: 4, lastUpdated: '2026-03-10', staleDays: 57 },
  { id: 'r38', categoryId: 'c7', code: 'LAB-004', description: 'Electrician (skilled)', unit: 'day', rateJMD: 10_500, rateUSD: 68, version: 4, lastUpdated: '2026-03-10', staleDays: 57 },
  { id: 'r39', categoryId: 'c7', code: 'LAB-005', description: 'General labourer', unit: 'day', rateJMD: 5_500, rateUSD: 35, version: 5, lastUpdated: '2026-04-01', staleDays: 35 },
  { id: 'r40', categoryId: 'c7', code: 'LAB-006', description: 'Site foreman', unit: 'day', rateJMD: 14_000, rateUSD: 90, version: 3, lastUpdated: '2026-02-01', staleDays: 94 },
  // Preliminary Items
  { id: 'r41', categoryId: 'c8', code: 'PRE-001', description: 'Site establishment / mobilisation', unit: 'item', rateJMD: 350_000, rateUSD: 2258, version: 3, lastUpdated: '2026-01-15', staleDays: 111 },
  { id: 'r42', categoryId: 'c8', code: 'PRE-002', description: 'Temporary hoarding (per lineal metre)', unit: 'lin.m', rateJMD: 4_200, rateUSD: 27, version: 2, lastUpdated: '2025-10-01', staleDays: 217 },
  { id: 'r43', categoryId: 'c8', code: 'PRE-003', description: 'Site security (monthly)', unit: 'month', rateJMD: 120_000, rateUSD: 774, version: 2, lastUpdated: '2026-02-15', staleDays: 80 },
  { id: 'r44', categoryId: 'c8', code: 'PRE-004', description: 'Project management fee (% of contract)', unit: '%', rateJMD: 0, rateUSD: 0, version: 1, lastUpdated: '2025-06-01', staleDays: 339 },
]

// ── Quotations ────────────────────────────────────────────────────────────────
export type SampleQuotation = {
  id: string; number: string; projectNumber: string; projectName: string
  client: string; totalJMD: number; status: string
  issued: string; signed: string | null
}

export const SAMPLE_QUOTATIONS: SampleQuotation[] = [
  { id: 'q1', number: 'QUO-2026-001', projectNumber: 'STG-2026-001', projectName: 'Pemberton Family Residence', client: 'Neville Pemberton', totalJMD: 48_500_000, status: 'SIGNED', issued: '2025-12-10', signed: '2025-12-18' },
  { id: 'q2', number: 'QUO-2026-002', projectNumber: 'STG-2026-002', projectName: 'Half Moon Bay Hotel — Wing C', client: 'Half Moon Resort Ltd', totalJMD: 124_800_000, status: 'SIGNED', issued: '2025-08-01', signed: '2025-08-14' },
  { id: 'q3', number: 'QUO-2026-003', projectNumber: 'STG-2026-002', projectName: 'Half Moon Bay Hotel — Wing C (Rev 1)', client: 'Half Moon Resort Ltd', totalJMD: 131_200_000, status: 'SUPERSEDED', issued: '2025-08-20', signed: null },
  { id: 'q4', number: 'QUO-2026-004', projectNumber: 'STG-2026-003', projectName: 'Kingston Commercial Complex', client: 'Pinnacle Developments Ltd', totalJMD: 87_200_000, status: 'SIGNED', issued: '2026-01-20', signed: '2026-02-03' },
  { id: 'q5', number: 'QUO-2026-005', projectNumber: 'STG-2026-004', projectName: 'Ocho Rios Beachfront Villas', client: 'Sunrise Properties Ltd', totalJMD: 62_300_000, status: 'SENT', issued: '2026-03-15', signed: null },
  { id: 'q6', number: 'QUO-2026-006', projectNumber: 'STG-2026-005', projectName: 'UWI Mona Science Block Renovation', client: 'Univ. of the West Indies', totalJMD: 34_700_000, status: 'SENT', issued: '2026-04-20', signed: null },
  { id: 'q7', number: 'QUO-2026-007', projectNumber: 'STG-2026-006', projectName: 'Portmore Retail Strip', client: 'Caribbean Retail Holdings', totalJMD: 18_900_000, status: 'DRAFT', issued: '2026-04-28', signed: null },
  { id: 'q8', number: 'QUO-2026-008', projectNumber: 'STG-2026-007', projectName: 'Mandeville Municipal Office', client: 'Manchester Parish Council', totalJMD: 9_600_000, status: 'DRAFT', issued: '2026-05-01', signed: null },
]

// ── Suppliers ─────────────────────────────────────────────────────────────────
export type SampleSupplier = {
  id: string; name: string; contact: string; specialty: string; rating: number; activePOs: number
}

export const SAMPLE_SUPPLIERS: SampleSupplier[] = [
  { id: 's1', name: 'Caribbean Concrete & Aggregates', contact: 'Glen Morgan', specialty: 'Concrete & Aggregates', rating: 5, activePOs: 3 },
  { id: 's2', name: 'Carib Steel Ltd', contact: 'Sandra Young', specialty: 'Rebar & Structural Steel', rating: 4, activePOs: 2 },
  { id: 's3', name: 'Electrosales Jamaica Ltd', contact: 'Paul Barrett', specialty: 'Electrical Materials', rating: 4, activePOs: 2 },
  { id: 's4', name: 'Grace & Sons Hardware', contact: 'Roy Grace', specialty: 'General Hardware & Timber', rating: 3, activePOs: 2 },
  { id: 's5', name: 'Plumbing World Jamaica', contact: 'Michelle Chin', specialty: 'Plumbing & Mechanical', rating: 4, activePOs: 2 },
  { id: 's6', name: 'JamPlant Hire Ltd', contact: 'Devon Blake', specialty: 'Plant & Equipment Hire', rating: 5, activePOs: 1 },
]

// ── Purchase Orders ───────────────────────────────────────────────────────────
export type SamplePO = {
  id: string; number: string; supplierId: string; supplierName: string
  projectNumber: string; items: number; valueJMD: number; status: string
  issuedDate: string; deliveryPct: number
}

export const SAMPLE_POS: SamplePO[] = [
  { id: 'po1', number: 'PO-2026-001', supplierId: 's1', supplierName: 'Caribbean Concrete & Aggregates', projectNumber: 'STG-2026-001', items: 4, valueJMD: 3_820_000, status: 'DELIVERED', issuedDate: '2026-01-18', deliveryPct: 100 },
  { id: 'po2', number: 'PO-2026-002', supplierId: 's2', supplierName: 'Carib Steel Ltd', projectNumber: 'STG-2026-001', items: 2, valueJMD: 6_480_000, status: 'DELIVERED', issuedDate: '2026-01-20', deliveryPct: 100 },
  { id: 'po3', number: 'PO-2026-003', supplierId: 's1', supplierName: 'Caribbean Concrete & Aggregates', projectNumber: 'STG-2026-002', items: 6, valueJMD: 9_200_000, status: 'ISSUED', issuedDate: '2026-03-01', deliveryPct: 70 },
  { id: 'po4', number: 'PO-2026-004', supplierId: 's3', supplierName: 'Electrosales Jamaica Ltd', projectNumber: 'STG-2026-002', items: 8, valueJMD: 4_650_000, status: 'PARTIAL_DELIVERY', issuedDate: '2026-02-10', deliveryPct: 55 },
  { id: 'po5', number: 'PO-2026-005', supplierId: 's4', supplierName: 'Grace & Sons Hardware', projectNumber: 'STG-2026-002', items: 12, valueJMD: 2_380_000, status: 'ISSUED', issuedDate: '2026-03-05', deliveryPct: 80 },
  { id: 'po6', number: 'PO-2026-006', supplierId: 's5', supplierName: 'Plumbing World Jamaica', projectNumber: 'STG-2026-002', items: 5, valueJMD: 3_120_000, status: 'PARTIAL_DELIVERY', issuedDate: '2026-02-20', deliveryPct: 40 },
  { id: 'po7', number: 'PO-2026-007', supplierId: 's1', supplierName: 'Caribbean Concrete & Aggregates', projectNumber: 'STG-2026-003', items: 5, valueJMD: 7_600_000, status: 'ISSUED', issuedDate: '2026-03-10', deliveryPct: 30 },
  { id: 'po8', number: 'PO-2026-008', supplierId: 's2', supplierName: 'Carib Steel Ltd', projectNumber: 'STG-2026-003', items: 3, valueJMD: 11_400_000, status: 'ISSUED', issuedDate: '2026-03-12', deliveryPct: 0 },
  { id: 'po9', number: 'PO-2026-009', supplierId: 's6', supplierName: 'JamPlant Hire Ltd', projectNumber: 'STG-2026-003', items: 2, valueJMD: 1_680_000, status: 'ISSUED', issuedDate: '2026-03-08', deliveryPct: 100 },
  { id: 'po10', number: 'PO-2026-010', supplierId: 's3', supplierName: 'Electrosales Jamaica Ltd', projectNumber: 'STG-2026-003', items: 7, valueJMD: 5_920_000, status: 'DRAFT', issuedDate: '2026-04-28', deliveryPct: 0 },
  { id: 'po11', number: 'PO-2026-011', supplierId: 's4', supplierName: 'Grace & Sons Hardware', projectNumber: 'STG-2026-001', items: 9, valueJMD: 1_840_000, status: 'DRAFT', issuedDate: '2026-04-30', deliveryPct: 0 },
  { id: 'po12', number: 'PO-2026-012', supplierId: 's5', supplierName: 'Plumbing World Jamaica', projectNumber: 'STG-2026-001', items: 4, valueJMD: 2_650_000, status: 'DRAFT', issuedDate: '2026-05-01', deliveryPct: 0 },
]

// ── Workers ───────────────────────────────────────────────────────────────────
export type SampleWorker = {
  id: string; name: string; trade: string; type: 'Direct' | 'Subcontractor'
  projectNumber: string; projectColor: string; daysScheduled: number; dailyRateJMD: number
  startDate: string; endDate: string
}

// Reference week: 2026-05-04 to 2026-05-09 (Mon-Sat)
export const SAMPLE_WORKERS: SampleWorker[] = [
  { id: 'w1', name: 'Clinton Brown', trade: 'Mason', type: 'Direct', projectNumber: 'STG-2026-001', projectColor: '#C9A227', daysScheduled: 5, dailyRateJMD: 8_500, startDate: '2026-05-04', endDate: '2026-05-08' },
  { id: 'w2', name: 'Dwayne Ellis', trade: 'Mason', type: 'Direct', projectNumber: 'STG-2026-001', projectColor: '#C9A227', daysScheduled: 5, dailyRateJMD: 8_500, startDate: '2026-05-04', endDate: '2026-05-08' },
  { id: 'w3', name: 'Rohan Henry', trade: 'Steel Fixer', type: 'Direct', projectNumber: 'STG-2026-001', projectColor: '#C9A227', daysScheduled: 5, dailyRateJMD: 9_000, startDate: '2026-05-04', endDate: '2026-05-08' },
  { id: 'w4', name: 'Andre Williams', trade: 'Carpenter', type: 'Direct', projectNumber: 'STG-2026-001', projectColor: '#C9A227', daysScheduled: 6, dailyRateJMD: 8_000, startDate: '2026-05-04', endDate: '2026-05-09' },
  { id: 'w5', name: 'Leroy Campbell', trade: 'Labourer', type: 'Direct', projectNumber: 'STG-2026-001', projectColor: '#C9A227', daysScheduled: 6, dailyRateJMD: 5_500, startDate: '2026-05-04', endDate: '2026-05-09' },
  { id: 'w6', name: 'Marcia Gordon', trade: 'Labourer', type: 'Direct', projectNumber: 'STG-2026-001', projectColor: '#C9A227', daysScheduled: 6, dailyRateJMD: 5_500, startDate: '2026-05-04', endDate: '2026-05-09' },
  { id: 'w7', name: 'Trevor Reid', trade: 'Site Foreman', type: 'Direct', projectNumber: 'STG-2026-002', projectColor: '#2563EB', daysScheduled: 6, dailyRateJMD: 14_000, startDate: '2026-05-04', endDate: '2026-05-09' },
  { id: 'w8', name: 'Sophia Blake', trade: 'Electrician', type: 'Direct', projectNumber: 'STG-2026-002', projectColor: '#2563EB', daysScheduled: 5, dailyRateJMD: 10_500, startDate: '2026-05-04', endDate: '2026-05-08' },
  { id: 'w9', name: 'Patrick Scott', trade: 'Plumber', type: 'Subcontractor', projectNumber: 'STG-2026-002', projectColor: '#2563EB', daysScheduled: 4, dailyRateJMD: 11_000, startDate: '2026-05-05', endDate: '2026-05-08' },
  { id: 'w10', name: 'Wayne Francis', trade: 'Painter', type: 'Subcontractor', projectNumber: 'STG-2026-002', projectColor: '#2563EB', daysScheduled: 5, dailyRateJMD: 7_500, startDate: '2026-05-04', endDate: '2026-05-08' },
  { id: 'w11', name: 'Garfield Morrison', trade: 'Mason', type: 'Direct', projectNumber: 'STG-2026-003', projectColor: '#16A34A', daysScheduled: 5, dailyRateJMD: 8_500, startDate: '2026-05-04', endDate: '2026-05-08' },
  { id: 'w12', name: 'Althea Brown', trade: 'Steel Fixer', type: 'Direct', projectNumber: 'STG-2026-003', projectColor: '#16A34A', daysScheduled: 5, dailyRateJMD: 9_000, startDate: '2026-05-04', endDate: '2026-05-08' },
  { id: 'w13', name: 'Desmond Clarke', trade: 'Carpenter', type: 'Direct', projectNumber: 'STG-2026-003', projectColor: '#16A34A', daysScheduled: 5, dailyRateJMD: 8_000, startDate: '2026-05-04', endDate: '2026-05-08' },
  { id: 'w14', name: 'Errol Watson', trade: 'Labourer', type: 'Subcontractor', projectNumber: 'STG-2026-003', projectColor: '#16A34A', daysScheduled: 6, dailyRateJMD: 5_500, startDate: '2026-05-04', endDate: '2026-05-09' },
]

// ── QC Checklists ─────────────────────────────────────────────────────────────
export type QCItem = { id: string; description: string; status: 'PASSED' | 'FAILED' | 'PENDING'; inspector: string; date: string | null }
export type SampleChecklist = { id: string; projectNumber: string; projectName: string; title: string; isComplete: boolean; items: QCItem[] }

export const SAMPLE_QC_CHECKLISTS: SampleChecklist[] = [
  {
    id: 'qc1', projectNumber: 'STG-2026-001', projectName: 'Pemberton Family Residence',
    title: 'Foundation & Ground Floor Slab', isComplete: true,
    items: [
      { id: 'i1', description: 'Excavation depth verified to engineer drawings', status: 'PASSED', inspector: 'D. Clarke', date: '2026-02-12' },
      { id: 'i2', description: 'Blinding concrete (50mm) level and cured', status: 'PASSED', inspector: 'D. Clarke', date: '2026-02-14' },
      { id: 'i3', description: 'Rebar placement verified — size, spacing, cover', status: 'PASSED', inspector: 'M. Reid', date: '2026-02-18' },
      { id: 'i4', description: 'Concrete pour witnessed and slump test done', status: 'PASSED', inspector: 'M. Reid', date: '2026-02-20' },
      { id: 'i5', description: 'Waterproof membrane to ground slab', status: 'PASSED', inspector: 'D. Clarke', date: '2026-02-25' },
    ],
  },
  {
    id: 'qc2', projectNumber: 'STG-2026-001', projectName: 'Pemberton Family Residence',
    title: 'Ground to First Floor Structure', isComplete: false,
    items: [
      { id: 'i6', description: 'Column formwork plumb and secure', status: 'PASSED', inspector: 'M. Reid', date: '2026-03-15' },
      { id: 'i7', description: 'Beam rebar cage inspected prior to casting', status: 'PASSED', inspector: 'M. Reid', date: '2026-03-18' },
      { id: 'i8', description: 'First floor slab thickness check (150mm)', status: 'FAILED', inspector: 'D. Clarke', date: '2026-03-22' },
      { id: 'i9', description: 'Slab soffit inspection after striking', status: 'PENDING', inspector: '—', date: null },
      { id: 'i10', description: 'Block wall plumb and mortar joints even', status: 'PENDING', inspector: '—', date: null },
    ],
  },
  {
    id: 'qc3', projectNumber: 'STG-2026-002', projectName: 'Half Moon Bay Hotel — Wing C',
    title: 'Electrical Rough-In', isComplete: true,
    items: [
      { id: 'i11', description: 'Conduit runs match approved drawing', status: 'PASSED', inspector: 'S. Blake', date: '2026-03-05' },
      { id: 'i12', description: 'All boxes at correct height/position', status: 'PASSED', inspector: 'S. Blake', date: '2026-03-06' },
      { id: 'i13', description: 'Earth continuity tested at all points', status: 'PASSED', inspector: 'M. Reid', date: '2026-03-08' },
      { id: 'i14', description: 'Wiring gauge confirmed per schedule', status: 'PASSED', inspector: 'S. Blake', date: '2026-03-08' },
    ],
  },
  {
    id: 'qc4', projectNumber: 'STG-2026-002', projectName: 'Half Moon Bay Hotel — Wing C',
    title: 'Final Finishes Inspection', isComplete: false,
    items: [
      { id: 'i15', description: 'Wall tiling — grout and alignment', status: 'PASSED', inspector: 'M. Reid', date: '2026-04-10' },
      { id: 'i16', description: 'Ceiling skimming — level and free of cracks', status: 'PASSED', inspector: 'M. Reid', date: '2026-04-12' },
      { id: 'i17', description: 'Door hardware installed and operable', status: 'PENDING', inspector: '—', date: null },
      { id: 'i18', description: 'Sanitaryware commissioning', status: 'PENDING', inspector: '—', date: null },
      { id: 'i19', description: 'Final paint coat — colour match approved', status: 'PENDING', inspector: '—', date: null },
    ],
  },
  {
    id: 'qc5', projectNumber: 'STG-2026-003', projectName: 'Kingston Commercial Complex',
    title: 'Substructure — Piled Foundations', isComplete: true,
    items: [
      { id: 'i20', description: 'Pile positions surveyed and marked', status: 'PASSED', inspector: 'D. Clarke', date: '2026-03-01' },
      { id: 'i21', description: 'Pile depth records reviewed', status: 'PASSED', inspector: 'D. Clarke', date: '2026-03-10' },
      { id: 'i22', description: 'Pile cap rebar and pour witnessed', status: 'PASSED', inspector: 'M. Reid', date: '2026-03-18' },
    ],
  },
  {
    id: 'qc6', projectNumber: 'STG-2026-003', projectName: 'Kingston Commercial Complex',
    title: 'Structural Frame — Level 1', isComplete: false,
    items: [
      { id: 'i23', description: 'Steel columns plumb within tolerance', status: 'PASSED', inspector: 'D. Clarke', date: '2026-04-05' },
      { id: 'i24', description: 'Bolted connections torque verified', status: 'PENDING', inspector: '—', date: null },
      { id: 'i25', description: 'Metal deck welded studs — pull test', status: 'PENDING', inspector: '—', date: null },
      { id: 'i26', description: 'Composite slab pour — slump and thickness', status: 'PENDING', inspector: '—', date: null },
    ],
  },
]

export type SamplePunchItem = { id: number; projectNumber: string; description: string; assignedTo: string; resolved: boolean; resolvedDate: string | null }

export const SAMPLE_PUNCH_LIST: SamplePunchItem[] = [
  { id: 1, projectNumber: 'STG-2026-001', description: 'Hairline crack on first floor east column — monitor and repair', assignedTo: 'Clinton Brown', resolved: false, resolvedDate: null },
  { id: 2, projectNumber: 'STG-2026-001', description: 'Staircase handrail height non-compliant (890mm, min 900mm)', assignedTo: 'Andre Williams', resolved: false, resolvedDate: null },
  { id: 3, projectNumber: 'STG-2026-002', description: 'Room 12B — AC unit refrigerant leak', assignedTo: 'Patrick Scott', resolved: true, resolvedDate: '2026-04-20' },
  { id: 4, projectNumber: 'STG-2026-002', description: 'Lobby entrance door not self-closing properly', assignedTo: 'Wayne Francis', resolved: false, resolvedDate: null },
  { id: 5, projectNumber: 'STG-2026-002', description: 'Missing grout line at shower drain edge (Rm 8A)', assignedTo: 'Wayne Francis', resolved: true, resolvedDate: '2026-04-28' },
]

export type SampleInspection = { id: string; inspector: string; project: string; date: string; status: string; lat: string; lng: string }

export const SAMPLE_INSPECTIONS: SampleInspection[] = [
  { id: 'ins1', inspector: 'Marcus Reid', project: 'STG-2026-001', date: '2026-04-30', status: 'APPROVED', lat: '17.9771', lng: '-76.7793' },
  { id: 'ins2', inspector: 'Dionne Clarke', project: 'STG-2026-003', date: '2026-04-28', status: 'REVIEWED', lat: '17.9876', lng: '-76.7894' },
  { id: 'ins3', inspector: 'Marcus Reid', project: 'STG-2026-002', date: '2026-04-25', status: 'APPROVED', lat: '18.4655', lng: '-77.7413' },
  { id: 'ins4', inspector: 'Dionne Clarke', project: 'STG-2026-001', date: '2026-05-02', status: 'SUBMITTED', lat: '17.9771', lng: '-76.7793' },
]

// ── Finance — Invoices ────────────────────────────────────────────────────────
export type SampleInvoice = {
  id: string; number: string; projectNumber: string; projectName: string; client: string
  subtotalJMD: number; taxJMD: number; totalJMD: number; status: string
  dueDate: string; paidDate: string | null
}

export const SAMPLE_INVOICES: SampleInvoice[] = [
  { id: 'inv1', number: 'INV-2026-001', projectNumber: 'STG-2026-001', projectName: 'Pemberton Family Residence', client: 'Neville Pemberton', subtotalJMD: 14_550_000, taxJMD: 2_182_500, totalJMD: 16_732_500, status: 'PAID', dueDate: '2026-01-30', paidDate: '2026-01-28' },
  { id: 'inv2', number: 'INV-2026-002', projectNumber: 'STG-2026-002', projectName: 'Half Moon Bay Hotel — Wing C', client: 'Half Moon Resort Ltd', subtotalJMD: 37_440_000, taxJMD: 5_616_000, totalJMD: 43_056_000, status: 'PAID', dueDate: '2026-02-15', paidDate: '2026-02-12' },
  { id: 'inv3', number: 'INV-2026-003', projectNumber: 'STG-2026-003', projectName: 'Kingston Commercial Complex', client: 'Pinnacle Developments Ltd', subtotalJMD: 26_160_000, taxJMD: 3_924_000, totalJMD: 30_084_000, status: 'PAID', dueDate: '2026-03-10', paidDate: '2026-03-18' },
  { id: 'inv4', number: 'INV-2026-004', projectNumber: 'STG-2026-001', projectName: 'Pemberton Family Residence', client: 'Neville Pemberton', subtotalJMD: 9_700_000, taxJMD: 1_455_000, totalJMD: 11_155_000, status: 'SENT', dueDate: '2026-04-15', paidDate: null },
  { id: 'inv5', number: 'INV-2026-005', projectNumber: 'STG-2026-002', projectName: 'Half Moon Bay Hotel — Wing C', client: 'Half Moon Resort Ltd', subtotalJMD: 24_960_000, taxJMD: 3_744_000, totalJMD: 28_704_000, status: 'PARTIAL', dueDate: '2026-04-01', paidDate: null },
  { id: 'inv6', number: 'INV-2026-006', projectNumber: 'STG-2026-003', projectName: 'Kingston Commercial Complex', client: 'Pinnacle Developments Ltd', subtotalJMD: 17_440_000, taxJMD: 2_616_000, totalJMD: 20_056_000, status: 'SENT', dueDate: '2026-04-28', paidDate: null },
  { id: 'inv7', number: 'INV-2026-007', projectNumber: 'STG-2026-004', projectName: 'Ocho Rios Beachfront Villas', client: 'Sunrise Properties Ltd', subtotalJMD: 18_690_000, taxJMD: 2_803_500, totalJMD: 21_493_500, status: 'DRAFT', dueDate: '2026-05-30', paidDate: null },
  { id: 'inv8', number: 'INV-2026-008', projectNumber: 'STG-2026-002', projectName: 'Half Moon Bay Hotel — Wing C', client: 'Half Moon Resort Ltd', subtotalJMD: 12_480_000, taxJMD: 1_872_000, totalJMD: 14_352_000, status: 'OVERDUE', dueDate: '2026-03-15', paidDate: null },
  { id: 'inv9', number: 'INV-2026-009', projectNumber: 'STG-2026-003', projectName: 'Kingston Commercial Complex', client: 'Pinnacle Developments Ltd', subtotalJMD: 8_720_000, taxJMD: 1_308_000, totalJMD: 10_028_000, status: 'PARTIAL', dueDate: '2026-05-10', paidDate: null },
  { id: 'inv10', number: 'INV-2026-010', projectNumber: 'STG-2026-001', projectName: 'Pemberton Family Residence', client: 'Neville Pemberton', subtotalJMD: 7_275_000, taxJMD: 1_091_250, totalJMD: 8_366_250, status: 'SENT', dueDate: '2026-05-20', paidDate: null },
]

// ── Cash Flow (monthly) ───────────────────────────────────────────────────────
export type CashFlowMonth = { month: string; received: number; outstanding: number }

export const SAMPLE_CASHFLOW: CashFlowMonth[] = [
  { month: 'Dec', received: 28_400_000, outstanding: 4_200_000 },
  { month: 'Jan', received: 36_800_000, outstanding: 8_600_000 },
  { month: 'Feb', received: 52_100_000, outstanding: 12_400_000 },
  { month: 'Mar', received: 41_600_000, outstanding: 18_200_000 },
  { month: 'Apr', received: 30_200_000, outstanding: 22_800_000 },
  { month: 'May', received: 18_500_000, outstanding: 41_200_000 },
]

// ── WIP (Work In Progress) ────────────────────────────────────────────────────
export type WIPRow = { projectNumber: string; projectName: string; contractValueJMD: number; billedJMD: number; earnedValueJMD: number }

export const SAMPLE_WIP: WIPRow[] = [
  { projectNumber: 'STG-2026-001', projectName: 'Pemberton Family Residence', contractValueJMD: 48_500_000, billedJMD: 36_253_750, earnedValueJMD: 30_070_000 },
  { projectNumber: 'STG-2026-002', projectName: 'Half Moon Bay Hotel — Wing C', contractValueJMD: 124_800_000, billedJMD: 86_112_000, earnedValueJMD: 109_824_000 },
  { projectNumber: 'STG-2026-003', projectName: 'Kingston Commercial Complex', contractValueJMD: 87_200_000, billedJMD: 40_168_000, earnedValueJMD: 34_880_000 },
]

// ── Receivables Aging ─────────────────────────────────────────────────────────
export type AgingBucket = { label: string; amountJMD: number }

export const SAMPLE_AGING: AgingBucket[] = [
  { label: '0–30 days', amountJMD: 28_700_000 },
  { label: '31–60 days', amountJMD: 16_400_000 },
  { label: '61–90 days', amountJMD: 8_200_000 },
  { label: '90+ days', amountJMD: 4_200_000 },
]

// ── Tender Pipeline ───────────────────────────────────────────────────────────
export type SampleTender = {
  id: string; projectName: string; client: string; status: string
  estimatedValueJMD: number; winProbabilityPct: number; pm: string; pmInitials: string
  submittedDate: string | null
}

export const SAMPLE_TENDERS: SampleTender[] = [
  { id: 't1', projectName: 'Caymanas Industrial Park — Phase 2', client: 'Caymanas Dev. Corp.', status: 'PROSPECT', estimatedValueJMD: 95_000_000, winProbabilityPct: 20, pm: 'Marcus Reid', pmInitials: 'MR', submittedDate: null },
  { id: 't2', projectName: 'New Kingston Office Tower', client: 'JNBS Property Fund', status: 'PROSPECT', estimatedValueJMD: 280_000_000, winProbabilityPct: 15, pm: 'Dionne Clarke', pmInitials: 'DC', submittedDate: null },
  { id: 't3', projectName: 'Montego Bay Convention Centre Expansion', client: 'Tourism Product Dev. Co.', status: 'QUALIFIED', estimatedValueJMD: 148_000_000, winProbabilityPct: 35, pm: 'Marcus Reid', pmInitials: 'MR', submittedDate: null },
  { id: 't4', projectName: 'Portmore Community Hospital', client: 'Ministry of Health', status: 'QUALIFIED', estimatedValueJMD: 420_000_000, winProbabilityPct: 25, pm: 'Dionne Clarke', pmInitials: 'DC', submittedDate: null },
  { id: 't5', projectName: 'Spanish Town Roundabout Upgrade', client: 'NWA', status: 'TENDER_PREP', estimatedValueJMD: 38_000_000, winProbabilityPct: 45, pm: 'Marcus Reid', pmInitials: 'MR', submittedDate: null },
  { id: 't6', projectName: 'Kingston Waterfront Hotel', client: 'Sagicor Real Estate', status: 'TENDER_PREP', estimatedValueJMD: 320_000_000, winProbabilityPct: 30, pm: 'Dionne Clarke', pmInitials: 'DC', submittedDate: null },
  { id: 't7', projectName: 'Andrews Memorial Hospital Car Park', client: 'Andrews Memorial Hospital', status: 'SUBMITTED', estimatedValueJMD: 22_000_000, winProbabilityPct: 60, pm: 'Marcus Reid', pmInitials: 'MR', submittedDate: '2026-04-10' },
  { id: 't8', projectName: 'Constant Spring Road Retaining Wall', client: 'KSAC', status: 'SHORTLISTED', estimatedValueJMD: 18_000_000, winProbabilityPct: 70, pm: 'Marcus Reid', pmInitials: 'MR', submittedDate: '2026-03-15' },
  { id: 't9', projectName: 'Liguanea Plaza Renovation', client: 'Liguanea Properties Ltd', status: 'WON', estimatedValueJMD: 44_000_000, winProbabilityPct: 100, pm: 'Dionne Clarke', pmInitials: 'DC', submittedDate: '2026-02-01' },
  { id: 't10', projectName: 'Cross Roads Traffic Signal Upgrade', client: 'Ministry of Works', status: 'LOST', estimatedValueJMD: 12_000_000, winProbabilityPct: 0, pm: 'Marcus Reid', pmInitials: 'MR', submittedDate: '2026-01-20' },
]

// ── Assets ────────────────────────────────────────────────────────────────────
export type SampleAsset = {
  id: string; tag: string; name: string; type: 'EQUIPMENT' | 'DRONE' | 'VEHICLE'
  status: 'ACTIVE' | 'INACTIVE'; lastMaintenance: string; nextDue: string
  maintenanceStatus: 'COMPLETED' | 'DUE' | 'OVERDUE'
  flightHours?: number; notes?: string
}

export const SAMPLE_ASSETS: SampleAsset[] = [
  { id: 'a1', tag: 'EQP-001', name: 'Komatsu PC200 Excavator', type: 'EQUIPMENT', status: 'ACTIVE', lastMaintenance: '2026-03-10', nextDue: '2026-06-10', maintenanceStatus: 'COMPLETED', notes: '250hr service completed' },
  { id: 'a2', tag: 'EQP-002', name: 'Bomag BW120AD Compactor', type: 'EQUIPMENT', status: 'ACTIVE', lastMaintenance: '2025-11-20', nextDue: '2026-02-20', maintenanceStatus: 'OVERDUE', notes: '3-month service overdue' },
  { id: 'a3', tag: 'EQP-003', name: 'Caterpillar 4.4L Generator (20kVA)', type: 'EQUIPMENT', status: 'ACTIVE', lastMaintenance: '2026-04-01', nextDue: '2026-07-01', maintenanceStatus: 'COMPLETED', notes: '250hr oil & filter change' },
  { id: 'a4', tag: 'DRN-001', name: 'DJI Phantom 4 RTK', type: 'DRONE', status: 'ACTIVE', lastMaintenance: '2026-02-15', nextDue: '2026-05-15', maintenanceStatus: 'DUE', flightHours: 48, notes: '100hr service due' },
  { id: 'a5', tag: 'DRN-002', name: 'DJI Mavic 3 Enterprise', type: 'DRONE', status: 'ACTIVE', lastMaintenance: '2026-04-20', nextDue: '2026-07-20', maintenanceStatus: 'COMPLETED', flightHours: 22, notes: 'Props replaced' },
  { id: 'a6', tag: 'VEH-001', name: 'Toyota Hilux D/Cab 4×4 (JBI-4521)', type: 'VEHICLE', status: 'ACTIVE', lastMaintenance: '2026-03-25', nextDue: '2026-06-25', maintenanceStatus: 'COMPLETED', notes: '5,000km service' },
  { id: 'a7', tag: 'VEH-002', name: 'Mitsubishi Canter Flatbed (JBI-7834)', type: 'VEHICLE', status: 'ACTIVE', lastMaintenance: '2025-12-01', nextDue: '2026-03-01', maintenanceStatus: 'OVERDUE', notes: 'Brake service overdue — ground until complete' },
]

// ── Sustainable Systems ───────────────────────────────────────────────────────
export type SampleSustainableSystem = {
  id: string; projectNumber: string; projectName: string; systemType: 'SOLAR' | 'RAINWATER' | 'ENERGY_AUDIT' | 'WIND'
  capacityKw: number | null; panelCount: number | null; auditScore: number | null
  installedDate: string; lastAuditDate: string | null; notes: string
}

export const SAMPLE_SUSTAINABLE: SampleSustainableSystem[] = [
  { id: 'sus1', projectNumber: 'STG-2026-001', projectName: 'Pemberton Family Residence', systemType: 'SOLAR', capacityKw: 8.4, panelCount: 24, auditScore: 88, installedDate: '2026-03-15', lastAuditDate: '2026-04-01', notes: 'Grid-tied with battery backup (20kWh LiFePO4)' },
  { id: 'sus2', projectNumber: 'STG-2026-002', projectName: 'Half Moon Bay Hotel — Wing C', systemType: 'SOLAR', capacityKw: 42.0, panelCount: 120, auditScore: 92, installedDate: '2026-01-20', lastAuditDate: '2026-04-15', notes: 'Commercial-scale rooftop array — grid export enabled' },
  { id: 'sus3', projectNumber: 'STG-2026-002', projectName: 'Half Moon Bay Hotel — Wing C', systemType: 'RAINWATER', capacityKw: null, panelCount: null, auditScore: 75, installedDate: '2026-02-10', lastAuditDate: '2026-04-15', notes: '30,000L collection tank with UV treatment for irrigation reuse' },
  { id: 'sus4', projectNumber: 'STG-2026-003', projectName: 'Kingston Commercial Complex', systemType: 'ENERGY_AUDIT', capacityKw: null, panelCount: null, auditScore: 64, installedDate: '2026-04-01', lastAuditDate: '2026-04-28', notes: 'ASHRAE Level 2 audit complete — HVAC upgrade recommended' },
]

// ── Approvals ─────────────────────────────────────────────────────────────────
export type SampleApproval =
  | { type: 'VARIATION'; id: string; ref: string; project: string; requestedBy: string; requestedByInitials: string; date: string; description: string; valueJMD: number }
  | { type: 'GATE_OVERRIDE'; id: string; gate: string; project: string; requestedBy: string; requestedByInitials: string; date: string; reason: string }
  | { type: 'QUOTATION'; id: string; quoteNumber: string; client: string; valueJMD: number; project: string; requestedBy: string; requestedByInitials: string; date: string }

export const SAMPLE_APPROVALS: SampleApproval[] = [
  { type: 'VARIATION', id: 'var1', ref: 'VAR-2026-003', project: 'STG-2026-001', requestedBy: 'Marcus Reid', requestedByInitials: 'MR', date: '2026-05-01', description: 'Additional retaining wall to east boundary — unforeseen ground conditions', valueJMD: 450_000 },
  { type: 'GATE_OVERRIDE', id: 'gate1', gate: 'MOBILIZATION', project: 'STG-2026-004', requestedBy: 'Dionne Clarke', requestedByInitials: 'DC', date: '2026-04-30', reason: 'Client confirmed deposit wire has been initiated. Bank confirmation reference #BNS-22048 received. Request override to begin site mobilisation.' },
  { type: 'QUOTATION', id: 'qua1', quoteNumber: 'QUO-2026-005', client: 'Sunrise Properties Ltd', valueJMD: 62_300_000, project: 'STG-2026-004', requestedBy: 'Marcus Reid', requestedByInitials: 'MR', date: '2026-04-28' },
  { type: 'QUOTATION', id: 'qua2', quoteNumber: 'QUO-2026-006', client: 'Univ. of the West Indies', valueJMD: 34_700_000, project: 'STG-2026-005', requestedBy: 'Dionne Clarke', requestedByInitials: 'DC', date: '2026-05-02' },
]

// ── Team (Settings) ───────────────────────────────────────────────────────────
export type SampleTeamMember = { id: string; name: string; role: string; email: string; isActive: boolean; lastLogin: string }

export const SAMPLE_TEAM: SampleTeamMember[] = [
  { id: 'u1', name: 'Devon Stagnum', role: 'FOUNDER', email: 'devon@stagnumeng.com', isActive: true, lastLogin: '2026-05-06' },
  { id: 'u2', name: 'Marcus Reid', role: 'PM', email: 'marcus@stagnumeng.com', isActive: true, lastLogin: '2026-05-06' },
  { id: 'u3', name: 'Dionne Clarke', role: 'QS', email: 'dionne@stagnumeng.com', isActive: true, lastLogin: '2026-05-05' },
  { id: 'u4', name: 'Trevor Reid', role: 'SUPERVISOR', email: 'trevor@stagnumeng.com', isActive: true, lastLogin: '2026-05-04' },
  { id: 'u5', name: 'Sandra Morgan', role: 'ADMIN', email: 'sandra@stagnumeng.com', isActive: true, lastLogin: '2026-05-06' },
  { id: 'u6', name: 'Wayne Francis', role: 'SUBCONTRACTOR', email: 'wayne.francis@jmpainting.com', isActive: true, lastLogin: '2026-04-28' },
]

// ── KPI Ticker values ─────────────────────────────────────────────────────────
export const SAMPLE_KPIS = [
  { label: 'Active Projects', value: '7', trend: 'up' as const },
  { label: 'Contract Value (JMD)', value: 'J$385.8M', trend: 'up' as const },
  { label: 'Outstanding Invoices', value: '3 invoices', trend: 'warn' as const },
  { label: 'Overdue Payments', value: 'J$14.4M', trend: 'down' as const },
  { label: 'Gates Locked', value: '2', trend: 'warn' as const },
  { label: 'Pending Approvals', value: '4 items', trend: 'warn' as const },
  { label: 'Stale Rates', value: '8 rates', trend: 'warn' as const },
]

// ── Dashboard — Recent Activity ───────────────────────────────────────────────
export type ActivityItem = { id: string; type: 'gate' | 'invoice' | 'po' | 'approval' | 'rate'; description: string; project: string; timeAgo: string }

export const SAMPLE_ACTIVITY: ActivityItem[] = [
  { id: 'act1', type: 'gate', description: 'Procurement Gate unlocked', project: 'STG-2026-003', timeAgo: '2h ago' },
  { id: 'act2', type: 'invoice', description: 'Invoice INV-2026-010 sent to client', project: 'STG-2026-001', timeAgo: '4h ago' },
  { id: 'act3', type: 'approval', description: 'Variation VAR-2026-003 submitted for approval', project: 'STG-2026-001', timeAgo: '1d ago' },
  { id: 'act4', type: 'po', description: 'PO-2026-012 raised — Plumbing World Jamaica', project: 'STG-2026-001', timeAgo: '1d ago' },
  { id: 'act5', type: 'rate', description: 'Rebar rates (STL-001, STL-002) updated to v5', project: '—', timeAgo: '2d ago' },
]
