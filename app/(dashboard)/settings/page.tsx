import { SettingsTabs } from '@/components/settings/SettingsTabs'
import { SAMPLE_TEAM } from '@/lib/sample-data'

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-obsidian tracking-tight uppercase">Settings</h1>
        <div className="h-0.5 w-10 bg-gold mt-2 mb-1" />
        <p className="text-sm text-concrete">Profile, team management, and system configuration</p>
      </div>

      <SettingsTabs team={SAMPLE_TEAM} />
    </div>
  )
}
