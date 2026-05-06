import { PrismaClient, UserRole } from '@prisma/client'
import bcrypt from 'bcryptjs'

const db = new PrismaClient()

const SEED_PASSWORD = 'Stagnum2026!'

const USERS: Array<{ email: string; name: string; role: UserRole; phone?: string }> = [
  { email: 'founder@stagnum.com', name: 'Marcus Reid', role: 'FOUNDER', phone: '+1-876-555-0001' },
  { email: 'pm@stagnum.com', name: 'Dionne Campbell', role: 'PM', phone: '+1-876-555-0002' },
  { email: 'qs@stagnum.com', name: 'Andre Thompson', role: 'QS', phone: '+1-876-555-0003' },
  { email: 'supervisor@stagnum.com', name: 'Devon Brown', role: 'SUPERVISOR', phone: '+1-876-555-0004' },
  { email: 'admin@stagnum.com', name: 'Keisha Morgan', role: 'ADMIN', phone: '+1-876-555-0005' },
  { email: 'sub@stagnum.com', name: 'Carlton Henry', role: 'SUBCONTRACTOR', phone: '+1-876-555-0006' },
]

const RATE_CATEGORIES = [
  { name: 'Site Preparation & Earthworks', sortOrder: 1 },
  { name: 'Concrete Works', sortOrder: 2 },
  { name: 'Reinforcement Steel', sortOrder: 3 },
  { name: 'Masonry & Blockwork', sortOrder: 4 },
  { name: 'Carpentry & Joinery', sortOrder: 5 },
  { name: 'Roofing', sortOrder: 6 },
  { name: 'Plumbing', sortOrder: 7 },
  { name: 'Electrical', sortOrder: 8 },
  { name: 'Tiling & Finishes', sortOrder: 9 },
  { name: 'Painting', sortOrder: 10 },
  { name: 'Sustainable Systems', sortOrder: 11 },
  { name: 'Preliminaries & General', sortOrder: 12 },
]

async function main() {
  console.log('🌱  Seeding Stagnum database...')

  const hash = await bcrypt.hash(SEED_PASSWORD, 12)

  for (const u of USERS) {
    await db.user.upsert({
      where: { email: u.email },
      update: {},
      create: { ...u, passwordHash: hash },
    })
    console.log(`  ✓ User: ${u.email} (${u.role})`)
  }

  for (const cat of RATE_CATEGORIES) {
    await db.rateCategory.upsert({
      where: { name: cat.name },
      update: {},
      create: cat,
    })
    console.log(`  ✓ Rate category: ${cat.name}`)
  }

  // Demo client
  const client = await db.client.upsert({
    where: { id: 'demo-client-001' },
    update: {},
    create: {
      id: 'demo-client-001',
      name: 'Pemberton Family',
      company: 'Pemberton Holdings Ltd',
      email: 'pemberton@example.com',
      phone: '+1-876-555-1000',
      address: '14 Norbrook Drive, Kingston 8, Jamaica',
      preferredCurrency: 'JMD',
    },
  })
  console.log(`  ✓ Demo client: ${client.name}`)

  // Demo project in ENQUIRY stage
  const project = await db.project.upsert({
    where: { projectNumber: 'STG-2026-001' },
    update: {},
    create: {
      projectNumber: 'STG-2026-001',
      name: 'Pemberton Residence — New Build',
      description: '4-bedroom 3-bathroom residential construction with solar system',
      clientId: client.id,
      stage: 'ENQUIRY',
      currency: 'JMD',
      siteAddress: '23 Cherry Gardens Ave, Kingston 8',
      siteLat: 18.0179,
      siteLng: -76.7497,
      depositPct: 0.30,
    },
  })
  console.log(`  ✓ Demo project: ${project.projectNumber}`)

  // Add founder and PM as project members
  const founder = await db.user.findUnique({ where: { email: 'founder@stagnum.com' } })
  const pm = await db.user.findUnique({ where: { email: 'pm@stagnum.com' } })

  if (founder) {
    await db.projectMember.upsert({
      where: { projectId_userId: { projectId: project.id, userId: founder.id } },
      update: {},
      create: { projectId: project.id, userId: founder.id, role: 'FOUNDER' },
    })
  }

  if (pm) {
    await db.projectMember.upsert({
      where: { projectId_userId: { projectId: project.id, userId: pm.id } },
      update: {},
      create: { projectId: project.id, userId: pm.id, role: 'PM' },
    })
  }

  console.log('\n✅  Seed complete.')
  console.log('\nTest credentials (all use password: ' + SEED_PASSWORD + '):')
  USERS.forEach((u) => console.log(`   ${u.role.padEnd(14)} ${u.email}`))
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => db.$disconnect())
