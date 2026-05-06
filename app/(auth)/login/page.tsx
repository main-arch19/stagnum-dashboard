'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Lock, Mail, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError('Invalid email or password')
      } else {
        router.push('/dashboard')
        router.refresh()
      }
    } catch {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-sm">
      {/* Logo */}
      <div className="flex flex-col items-center mb-8">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo.jpg"
          alt="Stagnum"
          className="h-12 w-12 object-contain mb-4"
          style={{ filter: 'brightness(0) invert(1)' }}
        />
        <h1 className="text-limestone text-xl font-semibold tracking-wide">STAGNUM</h1>
        <p className="text-concrete text-xs mt-1 tracking-widest uppercase font-mono">
          Operations Dashboard
        </p>
        <p className="text-concrete/40 text-[9px] mt-2 tracking-[0.2em] uppercase font-mono">
          Building Strength That Endures
        </p>
      </div>

      {/* Card */}
      <div
        className="rounded-xl border border-charcoal bg-charcoal/60 p-6 backdrop-blur"
        style={{ borderTopColor: '#C9A227', borderTopWidth: '2px' }}
      >
        <h2 className="text-limestone text-base font-medium mb-5">Sign in to your account</h2>

        {error && (
          <div className="mb-4 flex items-center gap-2 rounded border border-blocked/40 bg-blocked/10 px-3 py-2.5">
            <AlertCircle size={14} className="text-blocked shrink-0" />
            <p className="text-blocked text-xs">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-concrete text-xs mb-1.5 font-medium tracking-wide">
              Email address
            </label>
            <div className="relative">
              <Mail size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-steel pointer-events-none" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                placeholder="name@stagnum.com"
                className={cn(
                  'w-full rounded border border-steel/40 bg-obsidian py-2.5 pl-9 pr-3',
                  'text-limestone text-sm placeholder:text-concrete/50',
                  'outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-colors'
                )}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-concrete text-xs mb-1.5 font-medium tracking-wide">
              Password
            </label>
            <div className="relative">
              <Lock size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-steel pointer-events-none" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                placeholder="••••••••"
                className={cn(
                  'w-full rounded border border-steel/40 bg-obsidian py-2.5 pl-9 pr-10',
                  'text-limestone text-sm placeholder:text-concrete/50',
                  'outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-colors'
                )}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-steel hover:text-concrete transition-colors"
              >
                {showPassword ? <EyeOff size={13} /> : <Eye size={13} />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={cn(
              'w-full rounded bg-gold py-2.5 text-sm font-semibold text-obsidian',
              'hover:bg-gold/90 active:scale-[0.99] transition-all',
              'disabled:opacity-60 disabled:cursor-not-allowed',
              'mt-1'
            )}
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        {/* Dev hint */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-5 border-t border-charcoal pt-4">
            <p className="text-[10px] text-concrete/60 font-mono mb-2 uppercase tracking-wider">Dev accounts</p>
            <div className="space-y-1">
              {[
                ['founder@stagnum.com', 'FOUNDER'],
                ['pm@stagnum.com', 'PM'],
                ['qs@stagnum.com', 'QS'],
                ['supervisor@stagnum.com', 'SUPERVISOR'],
                ['admin@stagnum.com', 'ADMIN'],
              ].map(([mail, role]) => (
                <button
                  key={mail}
                  type="button"
                  onClick={() => {
                    setEmail(mail)
                    setPassword('Stagnum2026!')
                  }}
                  className="flex w-full items-center justify-between rounded px-2 py-1 text-[10px] font-mono text-concrete hover:bg-obsidian hover:text-limestone transition-colors"
                >
                  <span>{mail}</span>
                  <span className="text-steel">{role}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <p className="text-center text-[10px] text-concrete/50 mt-6">
        Stagnum Engineering & Construction Ltd — Internal System
      </p>
    </div>
  )
}
