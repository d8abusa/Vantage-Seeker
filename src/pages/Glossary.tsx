import { Card, CardHeader, CardTitle } from '@/components/ui/Card'
import { Search } from 'lucide-react'
import { useMemo, useState } from 'react'

const terms = [
  { term: 'Alpha', definition: 'Excess return relative to a benchmark, often attributed to skill or strategy edge.' },
  { term: 'Beta', definition: 'Sensitivity of an asset or portfolio to broad market movements.' },
  { term: 'Carry', definition: 'Return generated from holding a higher-yielding asset against a lower-yielding liability.' },
  { term: 'Contango', definition: 'A futures curve where longer-dated contracts trade above near-dated contracts.' },
  { term: 'Convexity', definition: 'Non-linear sensitivity of a bond price to changes in interest rates.' },
  { term: 'Delta', definition: 'First derivative of an option price with respect to the underlying price.' },
  { term: 'Dispersion Trading', definition: 'A strategy that trades index volatility against the volatility of its constituents.' },
  { term: 'DV01', definition: 'Dollar value of a one basis point change in yield; a measure of interest-rate risk.' },
  { term: 'Gamma', definition: 'Second derivative of an option price with respect to the underlying price.' },
  { term: 'Hedge Ratio', definition: 'The proportional size of a hedging position relative to the exposure being hedged.' },
  { term: 'Implied Volatility', definition: 'Volatility implied by observed option prices under a pricing model.' },
  { term: 'Kelly Criterion', definition: 'A formula for bet sizing that maximizes expected log-wealth.' },
  { term: 'KNN', definition: 'K-nearest neighbors, a non-parametric machine-learning algorithm.' },
  { term: 'Long/Short Equity', definition: 'A strategy that holds long positions while shorting overvalued securities.' },
  { term: 'Mean Reversion', definition: 'The tendency of a price or spread to return to its historical average.' },
  { term: 'Momentum', definition: 'The empirical tendency for assets with strong past returns to continue outperforming.' },
  { term: 'Naïve Bayes', definition: 'A probabilistic classifier based on Bayes theorem with independence assumptions.' },
  { term: 'OAS', definition: 'Option-adjusted spread, a yield spread adjusted for embedded options.' },
  { term: 'Pairs Trading', definition: 'A market-neutral strategy trading the relative value of two co-moving securities.' },
  { term: 'Sharpe Ratio', definition: 'Risk-adjusted return measured as excess return divided by volatility.' },
  { term: 'Skewness', definition: 'Asymmetry of the return distribution; negative skew implies tail risk.' },
  { term: 'Sortino Ratio', definition: 'Risk-adjusted return using downside deviation instead of total volatility.' },
  { term: 'Statistical Arbitrage', definition: 'A portfolio of mean-reverting, diversified quantitative strategies.' },
  { term: 'Theta', definition: 'Rate of decline in an option price due to the passage of time.' },
  { term: 'VIX', definition: 'CBOE Volatility Index, a measure of expected 30-day S&P 500 volatility.' },
  { term: 'Volatility Risk Premium', definition: 'The positive excess return from selling volatility on average.' },
]

export function Glossary() {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    return terms.filter(
      (t) =>
        t.term.toLowerCase().includes(query.toLowerCase()) ||
        t.definition.toLowerCase().includes(query.toLowerCase())
    )
  }, [query])

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-text-heading">Glossary</h1>
        <p className="mt-1 text-text">Key terms, acronyms, and notation from SSRN-3247865.</p>
      </div>

      <Card className="sticky top-20 z-20">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search terms..."
            className="h-11 w-full rounded-lg border border-border bg-bg-card pl-10 pr-4 text-sm text-text-heading outline-none transition focus:border-accent"
          />
        </div>
      </Card>

      <div className="grid gap-3 sm:grid-cols-2">
        {filtered.map((t) => (
          <Card key={t.term} className="transition hover:border-accent/30">
            <CardHeader>
              <CardTitle className="text-base text-accent">{t.term}</CardTitle>
            </CardHeader>
            <p className="text-sm text-text">{t.definition}</p>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center text-text-muted">No terms match your search.</div>
      )}
    </div>
  )
}
