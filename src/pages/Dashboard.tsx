import { Card, CardHeader, CardSubtitle, CardTitle } from '@/components/ui/Card'
import { strategies, categories } from '@/data/strategies'

import {
  Activity,
  ArrowUpRight,
  BarChart3,
  BookOpen,
  Briefcase,
  ChevronRight,
  Compass,
  FlaskConical,
  Layers,
  TrendingUp,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { motion } from 'framer-motion'

const stats = [
  { label: 'Total Strategies', value: strategies.length, change: '+151 from paper', icon: Compass, variant: 'accent' },
  { label: 'Asset Classes', value: Object.keys(categories).length, change: 'Coverage', icon: Layers, variant: 'secondary' },
  { label: 'AUM (Simulated)', value: '$1.24B', change: '+8.4% YTD', icon: Briefcase, variant: 'success' },
  { label: 'Sharpe Ratio', value: '1.82', change: '+0.14 vs benchmark', icon: Activity, variant: 'warning' },
]

const categoryData = Object.entries(categories).map(([name, meta]) => ({
  name: name.split(' ')[0],
  full: name,
  count: strategies.filter((s) => s.category === name).length,
  color: meta.color,
}))

const performanceData = [
  { month: 'Jan', value: 100 },
  { month: 'Feb', value: 103 },
  { month: 'Mar', value: 108 },
  { month: 'Apr', value: 106 },
  { month: 'May', value: 112 },
  { month: 'Jun', value: 118 },
  { month: 'Jul', value: 124 },
  { month: 'Aug', value: 122 },
  { month: 'Sep', value: 129 },
  { month: 'Oct', value: 135 },
  { month: 'Nov', value: 141 },
  { month: 'Dec', value: 148 },
]

export function Dashboard() {
  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid gap-6 lg:grid-cols-2"
      >
        <div>
          <h1 className="text-3xl font-bold text-text-heading lg:text-4xl">
            Quantitative <span className="text-gradient">Alpha Engine</span>
          </h1>
          <p className="mt-3 max-w-2xl text-text">
            A hedge fund operating system powered by the 151 trading strategies from Kakushadze & Serur (SSRN-3247865).
            Research, backtest, and deploy cross-asset strategies from options to cryptocurrencies.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 lg:justify-end">
          <Link
            to="/strategies"
            className="inline-flex h-11 items-center gap-2 rounded-lg bg-accent px-5 font-semibold text-bg shadow-lg shadow-accent/20 transition hover:bg-cyan-300"
          >
            <Compass className="h-4 w-4" />
            Explore Strategies
          </Link>
          <Link
            to="/portfolio"
            className="inline-flex h-11 items-center gap-2 rounded-lg border border-border-strong px-5 font-semibold text-text-heading transition hover:bg-bg-hover"
          >
            <Briefcase className="h-4 w-4" />
            Build Portfolio
          </Link>
        </div>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="relative overflow-hidden">
                <div
                  className={`absolute right-0 top-0 h-24 w-24 -translate-y-1/2 translate-x-1/2 rounded-full opacity-10 ${
                    stat.variant === 'accent'
                      ? 'bg-accent'
                      : stat.variant === 'success'
                      ? 'bg-accent-success'
                      : stat.variant === 'warning'
                      ? 'bg-accent-warning'
                      : 'bg-accent-secondary'
                  }`}
                />
                <CardHeader>
                  <div>
                    <CardSubtitle>{stat.label}</CardSubtitle>
                    <CardTitle className="mt-1 text-2xl">{stat.value}</CardTitle>
                  </div>
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                      stat.variant === 'accent'
                        ? 'bg-accent/10 text-accent'
                        : stat.variant === 'success'
                        ? 'bg-accent-success/10 text-accent-success'
                        : stat.variant === 'warning'
                        ? 'bg-accent-warning/10 text-accent-warning'
                        : 'bg-accent-secondary/10 text-accent-secondary'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                </CardHeader>
                <div className="flex items-center gap-1 text-xs font-medium text-accent-success">
                  <ArrowUpRight className="h-3.5 w-3.5" />
                  {stat.change}
                </div>
              </Card>
            </motion.div>
          )
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card className="h-full">
            <CardHeader>
              <div>
                <CardTitle>Fund Performance</CardTitle>
                <CardSubtitle>Simulated composite index across all strategy sleeves</CardSubtitle>
              </div>
              <div className="flex items-center gap-2 text-sm text-accent-success">
                <TrendingUp className="h-4 w-4" />
                +48.2%
              </div>
            </CardHeader>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip
                    contentStyle={{
                      background: '#15171d',
                      border: '1px solid #23262e',
                      borderRadius: '8px',
                    }}
                    itemStyle={{ color: '#22d3ee' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#22d3ee"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorValue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <Card className="h-full">
            <CardHeader>
              <div>
                <CardTitle>Asset Class Coverage</CardTitle>
                <CardSubtitle>Strategies by category</CardSubtitle>
              </div>
            </CardHeader>
            <div className="space-y-3">
              {categoryData
                .sort((a, b) => b.count - a.count)
                .slice(0, 8)
                .map((cat) => (
                  <div key={cat.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-2 w-2 rounded-full ${
                          cat.color === 'accent'
                            ? 'bg-accent'
                            : cat.color === 'accent-success'
                            ? 'bg-accent-success'
                            : cat.color === 'accent-warning'
                            ? 'bg-accent-warning'
                            : cat.color === 'accent-danger'
                            ? 'bg-accent-danger'
                            : cat.color === 'accent-secondary'
                            ? 'bg-accent-secondary'
                            : 'bg-accent-blue'
                        }`}
                      />
                      <span className="text-sm text-text">{cat.full}</span>
                    </div>
                    <span className="text-sm font-semibold text-text-heading">{cat.count}</span>
                  </div>
                ))}
            </div>
            <Link
              to="/strategies"
              className="mt-6 flex items-center justify-center gap-2 rounded-lg border border-border py-2.5 text-sm font-medium text-text transition hover:border-border-strong hover:text-text-heading"
            >
              View all strategies
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <div>
              <CardTitle>From Research to Deployment</CardTitle>
              <CardSubtitle>Your workflow in Vantage Seeker</CardSubtitle>
            </div>
          </CardHeader>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: BookOpen, title: '1. Research', desc: 'Browse 171 strategies with formulas and source pages.' },
              { icon: FlaskConical, title: '2. Backtest', desc: 'Run out-of-sample simulations with customizable parameters.' },
              { icon: Briefcase, title: '3. Allocate', desc: 'Build risk-parity or mean-variance portfolios.' },
              { icon: BarChart3, title: '4. Monitor', desc: 'Track live P&L, drawdowns, and factor exposure.' },
            ].map((step) => {
              const Icon = step.icon
              return (
                <div key={step.title} className="rounded-xl border border-border bg-bg-card p-4">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h4 className="font-semibold text-text-heading">{step.title}</h4>
                  <p className="mt-1 text-sm text-text-muted">{step.desc}</p>
                </div>
              )
            })}
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
