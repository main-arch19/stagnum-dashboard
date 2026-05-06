import { CURRENCY_SYMBOLS } from './constants'

type CurrencyCode = 'JMD' | 'USD'

export function formatCurrency(
  amount: number | string | null | undefined,
  currency: CurrencyCode = 'JMD',
  opts?: { compact?: boolean; decimals?: number }
): string {
  if (amount === null || amount === undefined) return '—'
  const num = typeof amount === 'string' ? parseFloat(amount) : amount
  if (isNaN(num)) return '—'

  const symbol = CURRENCY_SYMBOLS[currency] ?? currency
  const decimals = opts?.decimals ?? 2

  if (opts?.compact && Math.abs(num) >= 1_000_000) {
    return `${symbol}${(num / 1_000_000).toFixed(1)}M`
  }
  if (opts?.compact && Math.abs(num) >= 1_000) {
    return `${symbol}${(num / 1_000).toFixed(1)}K`
  }

  return `${symbol}${num.toLocaleString('en-JM', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}`
}

export function parseCurrency(value: string): number {
  return parseFloat(value.replace(/[^0-9.-]/g, ''))
}

export function convertJMDtoUSD(amountJMD: number, exchangeRate: number): number {
  if (exchangeRate === 0) return 0
  return amountJMD / exchangeRate
}
