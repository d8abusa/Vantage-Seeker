import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card, CardHeader, CardSubtitle, CardTitle } from '@/components/ui/Card'
import { strategies } from '@/data/strategies'
import { ArrowLeft, BookOpen, Calculator, FlaskConical, Share2 } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import katex from 'katex'
import 'katex/dist/katex.min.css'
import { motion } from 'framer-motion'

export function StrategyDetail() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const strategy = useMemo(() => strategies.find((s) => s.slug === slug), [slug])
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (strategy) document.title = `${strategy.name} · Vantage Seeker`
    return () => {
      document.title = 'Vantage Seeker · Quantitative Alpha Engine'
    }
  }, [strategy])

  if (!strategy) {
    return (
      <div className="mx-auto max-w-3xl py-20 text-center">
        <h1 className="text-2xl font-bold text-text-heading">Strategy not found</h1>
        <p className="mt-2 text-text">The strategy you are looking for does not exist in the universe.</p>
        <Button className="mt-6" onClick={() => navigate('/strategies')}>
          <ArrowLeft className="h-4 w-4" />
          Back to Strategies
        </Button>
      </div>
    )
  }

  const related = strategies
    .filter((s) => s.category === strategy.category && s.id !== strategy.id)
    .slice(0, 4)

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between"
      >
        <div>
          <Link
            to="/strategies"
            className="mb-3 inline-flex items-center gap-1 text-sm text-text-muted transition hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to universe
          </Link>
          <h1 className="text-3xl font-bold text-text-heading lg:text-4xl">
            {strategy.id}. {strategy.name}
          </h1>
          <p className="mt-2 text-text">{strategy.category} · Page {strategy.page} in SSRN-3247865</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              navigator.clipboard.writeText(window.location.href)
              setCopied(true)
              setTimeout(() => setCopied(false), 1500)
            }}
          >
            <Share2 className="h-4 w-4" />
            {copied ? 'Copied' : 'Share'}
          </Button>
          <Link to="/backtest">
            <Button size="sm">
              <FlaskConical className="h-4 w-4" />
              Backtest
            </Button>
          </Link>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
      >
        <Card>
          <CardHeader>
            <div className="flex flex-wrap items-center gap-2">
              <Badge
                variant={
                  strategy.complexity === 'Beginner'
                    ? 'success'
                    : strategy.complexity === 'Advanced'
                    ? 'danger'
                    : 'accent'
                }
              >
                {strategy.complexity}
              </Badge>
              {strategy.tags.map((tag) => (
                <Badge key={tag} variant="default">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardHeader>
          <p className="text-base leading-relaxed text-text">{strategy.description}</p>
        </Card>
      </motion.div>

      {strategy.formulas.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-accent" />
                <CardTitle>Mathematical Formulation</CardTitle>
              </div>
              <CardSubtitle>Core equations and rules</CardSubtitle>
            </CardHeader>
            <div className="grid gap-4">
              {strategy.formulas.map((formula, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-border bg-bg-card p-4 overflow-x-auto"
                  dangerouslySetInnerHTML={{
                    __html: katex.renderToString(formula, {
                      throwOnError: false,
                      displayMode: true,
                    }),
                  }}
                />
              ))}
            </div>
          </Card>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="grid gap-6 lg:grid-cols-2"
      >
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-accent-secondary" />
              <CardTitle>Implementation Notes</CardTitle>
            </div>
          </CardHeader>
          <ul className="space-y-3 text-sm text-text">
            <li className="flex gap-3">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent" />
              Data requirements: historical prices, volume, and relevant market microstructure.
            </li>
            <li className="flex gap-3">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent" />
              Rebalancing: typically monthly, weekly, or intraday depending on the signal horizon.
            </li>
            <li className="flex gap-3">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent" />
              Risk controls: position limits, stop-losses, and sector/neutrality constraints.
            </li>
            <li className="flex gap-3">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent" />
              Transaction costs: slippage, commissions, and market impact should be modeled.
            </li>
          </ul>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Related Strategies</CardTitle>
            <CardSubtitle>From the same asset class</CardSubtitle>
          </CardHeader>
          <div className="space-y-2">
            {related.map((s) => (
              <Link
                key={s.id}
                to={`/strategies/${s.slug}`}
                className="flex items-center justify-between rounded-lg border border-border bg-bg-card p-3 transition hover:border-accent/30 hover:bg-bg-hover"
              >
                <span className="text-sm font-medium text-text-heading">
                  {s.id}. {s.name}
                </span>
                <Badge variant={s.complexity === 'Beginner' ? 'success' : s.complexity === 'Advanced' ? 'danger' : 'accent'}>
                  {s.complexity}
                </Badge>
              </Link>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
