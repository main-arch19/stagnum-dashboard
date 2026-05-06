import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Sidebar } from '@/components/layout/Sidebar'
import { TopNav } from '@/components/layout/TopNav'
import { KPITicker } from '@/components/layout/KPITicker'
import { TRPCProvider } from '@/components/providers'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session?.user) redirect('/login')

  const { name, email, role } = session.user as { name: string; email: string; role: string }
  const isFounder = role === 'FOUNDER'

  return (
    <TRPCProvider>
      <Sidebar userRole={role} userName={name ?? ''} userEmail={email ?? ''} />

      <div className={`ml-60 flex min-h-screen flex-col ${isFounder ? 'pb-8' : ''}`}>
        <TopNav userName={name ?? ''} userRole={role} />

        <main className="flex-1 pt-14">
          <div className="p-6">{children}</div>
        </main>
      </div>

      {isFounder && <KPITicker />}
    </TRPCProvider>
  )
}
