import { cn } from '@/lib/utils'
import {
  Activity,
  BarChart3,
  BookOpen,
  Briefcase,
  ChevronRight,
  Compass,
  FlaskConical,
  Home,
  LayoutDashboard,
  Menu,
  Settings,
  Sparkles,
  X,
} from 'lucide-react'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const navItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/wizard', label: 'Strategy Wizard', icon: Sparkles },
  { path: '/strategies', label: 'Strategies', icon: Compass },
  { path: '/portfolio', label: 'Portfolio Builder', icon: Briefcase },
  { path: '/backtest', label: 'Backtest Lab', icon: FlaskConical },
  { path: '/analytics', label: 'Risk Analytics', icon: Activity },
]

const bottomItems = [
  { path: '/glossary', label: 'Glossary', icon: BookOpen },
  { path: '/settings', label: 'Settings', icon: Settings },
]

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="flex min-h-screen">
      {/* Desktop sidebar */}
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 flex-col border-r border-border bg-bg-elevated/80 backdrop-blur-xl lg:flex">
        <div className="flex h-16 items-center gap-3 border-b border-border px-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-accent-secondary shadow-lg shadow-accent/20">
            <BarChart3 className="h-5 w-5 text-bg" />
          </div>
          <div>
            <h1 className="text-base font-bold text-text-heading tracking-tight">Vantage Seeker</h1>
            <p className="text-[10px] uppercase tracking-widest text-text-muted">Quantitative Alpha</p>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <div className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-text-muted">Platform</div>
          {navItems.map((item) => {
            const Icon = item.icon
            const active = location.pathname === item.path || location.pathname.startsWith(`${item.path}/`)
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                  active
                    ? 'bg-accent/10 text-accent'
                    : 'text-text hover:bg-bg-hover hover:text-text-heading'
                )}
              >
                <Icon className={cn('h-4.5 w-4.5', active ? 'text-accent' : 'text-text-muted group-hover:text-text-heading')} />
                {item.label}
                {active && <ChevronRight className="ml-auto h-4 w-4 text-accent" />}
              </Link>
            )
          })}

          <div className="mt-6 mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-text-muted">Reference</div>
          {bottomItems.map((item) => {
            const Icon = item.icon
            const active = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                  active
                    ? 'bg-accent/10 text-accent'
                    : 'text-text hover:bg-bg-hover hover:text-text-heading'
                )}
              >
                <Icon className={cn('h-4.5 w-4.5', active ? 'text-accent' : 'text-text-muted group-hover:text-text-heading')} />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="border-t border-border p-4">
          <div className="rounded-xl border border-border bg-bg-card p-3">
            <div className="mb-1 text-xs text-text-muted">System Status</div>
            <div className="flex items-center gap-2 text-sm font-medium text-accent-success">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-success opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-success"></span>
              </span>
              Data feeds live
            </div>
            <div className="mt-2 text-[10px] text-text-muted">171 strategies loaded from SSRN-3247865</div>
          </div>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="fixed left-0 right-0 top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-bg/90 px-4 backdrop-blur-lg lg:left-64 lg:px-8">
        <button
          onClick={() => setMobileOpen(true)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-border lg:hidden"
        >
          <Menu className="h-5 w-5 text-text-heading" />
        </button>

        <div className="hidden items-center gap-2 text-sm text-text-muted lg:flex">
          <Home className="h-4 w-4" />
          <ChevronRight className="h-3 w-3" />
          <span className="text-text-heading">{navItems.find((i) => location.pathname === i.path || location.pathname.startsWith(`${i.path}/`))?.label || 'Dashboard'}</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden rounded-lg border border-border bg-bg-card px-3 py-1.5 text-xs text-text-muted md:block">
            <span className="text-text-heading">Market:</span> NYSE Pre-market
          </div>
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-accent-secondary to-accent border border-border" />
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-64 bg-bg-elevated p-4">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-accent-secondary">
                  <BarChart3 className="h-5 w-5 text-bg" />
                </div>
                <h1 className="font-bold text-text-heading">Vantage Seeker</h1>
              </div>
              <button onClick={() => setMobileOpen(false)}>
                <X className="h-5 w-5 text-text-muted" />
              </button>
            </div>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-text hover:bg-bg-hover"
                  >
                    <Icon className="h-4.5 w-4.5" />
                    {item.label}
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 pt-16 lg:pl-64">
        <div className="min-h-[calc(100vh-4rem)] p-4 lg:p-8">{children}</div>
      </main>
    </div>
  )
}
