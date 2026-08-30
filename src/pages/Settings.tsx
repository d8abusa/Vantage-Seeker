import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card, CardSubtitle, CardTitle } from '@/components/ui/Card'
import { Bell, CheckCircle2, Eye, EyeOff, Lock, Moon, Plus, RefreshCw, Save, Sun, User, XCircle } from 'lucide-react'
import { useState } from 'react'

interface ApiKey {
  id: string
  name: string
  serviceName: string
  endpoint: string
  swaggerUrl: string
  key: string
  created: string
  lastUsed: string
  status: 'unknown' | 'connected' | 'error'
}

export function Settings() {
  const [activeSection, setActiveSection] = useState<string | null>('Account')

  // Account
  const [profile, setProfile] = useState({
    name: 'Robert Nichols',
    email: 'robert@vantage-alpha.com',
    firm: 'Vantage Seeker Capital',
    role: 'Portfolio Manager',
  })
  const [profileSaved, setProfileSaved] = useState(false)

  // API keys
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    {
      id: '1',
      name: 'Live Trading Feed',
      serviceName: 'Polygon.io',
      endpoint: 'https://api.polygon.io/v2',
      swaggerUrl: 'https://polygon.io/docs/stocks/getting-started',
      key: 'vtg_live_••••••••••••••••••••••••',
      created: '2026-08-01',
      lastUsed: '2 hours ago',
      status: 'connected',
    },
    {
      id: '2',
      name: 'Research API',
      serviceName: 'Alpaca Markets',
      endpoint: 'https://paper-api.alpaca.markets/v2',
      swaggerUrl: 'https://docs.alpaca.markets/reference',
      key: 'vtg_rsr_••••••••••••••••••••••••',
      created: '2026-07-15',
      lastUsed: '5 days ago',
      status: 'unknown',
    },
  ])
  const [revealedKeys, setRevealedKeys] = useState<Set<string>>(new Set())

  // Notifications
  const [notifications, setNotifications] = useState({
    drawdown: true,
    signals: true,
    reports: false,
    executions: true,
  })

  // Security
  const [twoFactor, setTwoFactor] = useState(false)

  // Appearance
  const [density, setDensity] = useState<'comfortable' | 'compact'>('comfortable')

  const saveProfile = () => {
    setProfileSaved(true)
    setTimeout(() => setProfileSaved(false), 2000)
  }

  const toggleKey = (id: string) => {
    const next = new Set(revealedKeys)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    setRevealedKeys(next)
  }

  const addApiKey = () => {
    const newKey: ApiKey = {
      id: Math.random().toString(36).slice(2),
      name: 'New API Key',
      serviceName: '',
      endpoint: '',
      swaggerUrl: '',
      key: `vtg_${Math.random().toString(36).slice(2, 6)}_${'x'.repeat(28)}`,
      created: new Date().toISOString().split('T')[0],
      lastUsed: 'Never',
      status: 'unknown',
    }
    setApiKeys([...apiKeys, newKey])
  }

  const removeApiKey = (id: string) => {
    setApiKeys(apiKeys.filter((k) => k.id !== id))
  }

  const updateApiKey = (id: string, field: keyof ApiKey, value: string) => {
    setApiKeys(apiKeys.map((k) => (k.id === id ? { ...k, [field]: value } : k)))
  }

  const testConnection = (id: string) => {
    setApiKeys(apiKeys.map((k) => (k.id === id ? { ...k, status: 'unknown' } : k)))
    setTimeout(() => {
      setApiKeys((keys) =>
        keys.map((k) =>
          k.id === id
            ? { ...k, status: Math.random() > 0.2 ? 'connected' : 'error', lastUsed: 'Just now' }
            : k
        )
      )
    }, 800)
  }

  const sections = [
    { icon: User, title: 'Account', desc: 'Manage profile, API keys, and team access.' },
    { icon: Bell, title: 'Notifications', desc: 'Alerts for drawdowns, signal changes, and reports.' },
    { icon: Lock, title: 'Security', desc: 'Two-factor authentication and audit logs.' },
    { icon: Moon, title: 'Appearance', desc: 'Theme preferences and dashboard density.' },
  ]

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-text-heading">Settings</h1>
        <p className="mt-1 text-text">Configure your workspace preferences and data sources.</p>
      </div>

      <div className="space-y-4">
        {sections.map((section) => {
          const Icon = section.icon
          const isActive = activeSection === section.title
          return (
            <Card key={section.title} className="overflow-hidden">
              <div
                className="flex cursor-pointer items-center justify-between p-5"
                onClick={() => setActiveSection(isActive ? null : section.title)}
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-bg-hover text-accent">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-base">{section.title}</CardTitle>
                    <CardSubtitle>{section.desc}</CardSubtitle>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); setActiveSection(isActive ? null : section.title) }}>
                  {isActive ? 'Close' : 'Configure'}
                </Button>
              </div>

              {isActive && (
                <div className="border-t border-border bg-bg-card/50 p-5">
                  {section.title === 'Account' && (
                    <div className="space-y-6">
                      <div className="grid gap-4 sm:grid-cols-2">
                        {[
                          { label: 'Full Name', key: 'name', type: 'text' },
                          { label: 'Email', key: 'email', type: 'email' },
                          { label: 'Firm', key: 'firm', type: 'text' },
                          { label: 'Role', key: 'role', type: 'text' },
                        ].map((field) => (
                          <div key={field.key}>
                            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-text-muted">
                              {field.label}
                            </label>
                            <input
                              type={field.type}
                              value={profile[field.key as keyof typeof profile]}
                              onChange={(e) => setProfile({ ...profile, [field.key]: e.target.value })}
                              className="h-10 w-full rounded-lg border border-border bg-bg px-3 text-sm text-text-heading outline-none transition focus:border-accent"
                            />
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center gap-3">
                        <Button onClick={saveProfile}>
                          <Save className="h-4 w-4" />
                          {profileSaved ? 'Saved' : 'Save Profile'}
                        </Button>
                        {profileSaved && <Badge variant="success">Changes saved</Badge>}
                      </div>

                      <div className="pt-6">
                        <div className="mb-4 flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-text-heading">API Connections</h3>
                            <p className="text-xs text-text-muted">Manage data provider keys, endpoints, and OpenAPI/Swagger specs.</p>
                          </div>
                          <Button size="sm" onClick={addApiKey}>
                            <Plus className="h-4 w-4" />
                            Add Connection
                          </Button>
                        </div>
                        <div className="space-y-4">
                          {apiKeys.map((k) => (
                            <div key={k.id} className="rounded-lg border border-border bg-bg p-4">
                              <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                <div className="flex-1">
                                  <input
                                    type="text"
                                    value={k.name}
                                    onChange={(e) => updateApiKey(k.id, 'name', e.target.value)}
                                    className="mb-1 w-full bg-transparent text-base font-semibold text-text-heading outline-none placeholder:text-text-muted focus:border-b focus:border-accent"
                                    placeholder="Connection name"
                                  />
                                  <div className="text-xs text-text-muted">Created {k.created} · Last used {k.lastUsed}</div>
                                </div>
                                <div className="flex items-center gap-2">
                                  {k.status === 'connected' && (
                                    <Badge variant="success" className="gap-1">
                                      <CheckCircle2 className="h-3 w-3" />
                                      Connected
                                    </Badge>
                                  )}
                                  {k.status === 'error' && (
                                    <Badge variant="danger" className="gap-1">
                                      <XCircle className="h-3 w-3" />
                                      Error
                                    </Badge>
                                  )}
                                  {k.status === 'unknown' && <Badge variant="default">Not tested</Badge>}
                                  <Button variant="outline" size="sm" onClick={() => removeApiKey(k.id)}>
                                    Revoke
                                  </Button>
                                </div>
                              </div>

                              <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                  <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-text-muted">
                                    Service Name
                                  </label>
                                  <input
                                    type="text"
                                    value={k.serviceName}
                                    onChange={(e) => updateApiKey(k.id, 'serviceName', e.target.value)}
                                    placeholder="e.g. Polygon.io"
                                    className="h-9 w-full rounded-lg border border-border bg-bg-card px-3 text-sm text-text-heading outline-none focus:border-accent"
                                  />
                                </div>
                                <div>
                                  <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-text-muted">
                                    API Endpoint
                                  </label>
                                  <input
                                    type="text"
                                    value={k.endpoint}
                                    onChange={(e) => updateApiKey(k.id, 'endpoint', e.target.value)}
                                    placeholder="https://api.example.com/v1"
                                    className="h-9 w-full rounded-lg border border-border bg-bg-card px-3 text-sm font-mono text-text-heading outline-none focus:border-accent"
                                  />
                                </div>
                                <div className="sm:col-span-2">
                                  <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-text-muted">
                                    Swagger / OpenAPI Spec URL
                                  </label>
                                  <input
                                    type="text"
                                    value={k.swaggerUrl}
                                    onChange={(e) => updateApiKey(k.id, 'swaggerUrl', e.target.value)}
                                    placeholder="https://api.example.com/openapi.json"
                                    className="h-9 w-full rounded-lg border border-border bg-bg-card px-3 text-sm font-mono text-text-heading outline-none focus:border-accent"
                                  />
                                </div>
                              </div>

                              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                <div className="flex items-center gap-2">
                                  <code className="rounded-md bg-bg-hover px-2 py-1 text-xs text-text">
                                    {revealedKeys.has(k.id) ? k.key : k.key.replace(/[a-zA-Z0-9]/g, '•')}
                                  </code>
                                  <button
                                    onClick={() => toggleKey(k.id)}
                                    className="flex h-8 w-8 items-center justify-center rounded-lg text-text-muted transition hover:bg-bg-hover hover:text-text-heading"
                                  >
                                    {revealedKeys.has(k.id) ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                  </button>
                                </div>
                                <div className="flex items-center gap-2">
                                  {k.swaggerUrl && (
                                    <a
                                      href={k.swaggerUrl}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="text-xs font-medium text-accent hover:underline"
                                    >
                                      View Docs →
                                    </a>
                                  )}
                                  <Button size="sm" variant="outline" onClick={() => testConnection(k.id)}>
                                    <RefreshCw className="h-3.5 w-3.5" />
                                    Test
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {section.title === 'Notifications' && (
                    <div className="space-y-4">
                      {[
                        { key: 'drawdown', label: 'Drawdown Alerts', desc: 'Notify when portfolio drawdown exceeds threshold.' },
                        { key: 'signals', label: 'Signal Changes', desc: 'Notify when strategy signals flip direction.' },
                        { key: 'reports', label: 'Daily Reports', desc: 'Email a daily P&L and risk summary.' },
                        { key: 'executions', label: 'Trade Executions', desc: 'Real-time alerts for order fills and errors.' },
                      ].map((item) => (
                        <label
                          key={item.key}
                          className="flex cursor-pointer items-center justify-between rounded-lg border border-border bg-bg p-4 transition hover:border-border-strong"
                        >
                          <div>
                            <div className="font-medium text-text-heading">{item.label}</div>
                            <div className="text-xs text-text-muted">{item.desc}</div>
                          </div>
                          <input
                            type="checkbox"
                            checked={notifications[item.key as keyof typeof notifications]}
                            onChange={(e) => setNotifications({ ...notifications, [item.key]: e.target.checked })}
                            className="h-5 w-5 rounded border-border bg-bg-hover text-accent focus:ring-accent"
                          />
                        </label>
                      ))}
                    </div>
                  )}

                  {section.title === 'Security' && (
                    <div className="space-y-4">
                      <label className="flex cursor-pointer items-center justify-between rounded-lg border border-border bg-bg p-4">
                        <div>
                          <div className="font-medium text-text-heading">Two-Factor Authentication</div>
                          <div className="text-xs text-text-muted">Require TOTP for login and trading actions.</div>
                        </div>
                        <input
                          type="checkbox"
                          checked={twoFactor}
                          onChange={(e) => setTwoFactor(e.target.checked)}
                          className="h-5 w-5 rounded border-border bg-bg-hover text-accent focus:ring-accent"
                        />
                      </label>
                      <div className="rounded-lg border border-border bg-bg p-4">
                        <div className="mb-2 font-medium text-text-heading">Session Management</div>
                        <div className="text-sm text-text-muted">Active session · Last login 2026-08-26 from 127.0.0.1</div>
                        <Button variant="outline" size="sm" className="mt-3">
                          Sign Out All Devices
                        </Button>
                      </div>
                    </div>
                  )}

                  {section.title === 'Appearance' && (
                    <div className="space-y-4">
                      <div>
                        <div className="mb-3 font-medium text-text-heading">Dashboard Density</div>
                        <div className="flex gap-2">
                          {(['comfortable', 'compact'] as const).map((d) => (
                            <button
                              key={d}
                              onClick={() => setDensity(d)}
                              className={`rounded-lg border px-4 py-2 text-sm font-medium capitalize transition ${
                                density === d
                                  ? 'border-accent bg-accent/10 text-accent'
                                  : 'border-border bg-bg text-text hover:border-border-strong'
                              }`}
                            >
                              {d}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="mb-3 font-medium text-text-heading">Theme</div>
                        <div className="flex gap-2">
                          <button className="inline-flex items-center gap-2 rounded-lg border border-accent bg-accent/10 px-4 py-2 text-sm font-medium text-accent">
                            <Moon className="h-4 w-4" />
                            Dark
                          </button>
                          <button className="inline-flex items-center gap-2 rounded-lg border border-border bg-bg px-4 py-2 text-sm font-medium text-text-muted">
                            <Sun className="h-4 w-4" />
                            Light
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </Card>
          )
        })}
      </div>
    </div>
  )
}
