import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card, CardHeader, CardSubtitle, CardTitle } from '@/components/ui/Card'
import { strategies } from '@/data/strategies'
import { selectSignalType } from '@/lib/backtest'
import { signalOptions, strategyPresets } from '@/lib/config'
import { fetchYahooHistory } from '@/lib/data/yahoo'
import { runHistoricalEngine, runSimulationEngine } from '@/lib/engines'
import { OperationalMode, type HistoricalResult, type SignalType, type SimulationResult } from '@/lib/model'
import { formatCurrency, formatPercent } from '@/lib/utils'
import { AlertCircle, Database, Play, RotateCcw, Save, Settings2 } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const timeframes = [
  { label: '1Y', years: 1 },
  { label: '3Y', years: 3 },
  { label: '5Y', years: 5 },
  { label: '10Y', years: 10 },
]

export function Backtest() {
  const [capital, setCapital] = useState(1000000)
  const [years, setYears] = useState(5)
  const [annualReturn, setAnnualReturn] = useState(10)
  const [annualVol, setAnnualVol] = useState(16)
  const [asset, setAsset] = useState('SPY')
  const [selectedStrategyId, setSelectedStrategyId] = useState(strategies[59].id)

  const [dataSource, setDataSource] = useState<'synthetic' | 'yahoo'>('synthetic')
  const [proxyUrl, setProxyUrl] = useState('')
  const [signalType, setSignalType] = useState<SignalType>('momentum')

  const [running, setRunning] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<{
    data: SimulationResult | HistoricalResult
    mode: OperationalMode
  } | null>(null)

  const selectedStrategy = useMemo(
    () => strategies.find((s) => s.id === selectedStrategyId) || strategies[0],
    [selectedStrategyId]
  )

  useEffect(() => {
    const preset = strategyPresets[selectedStrategy.category] || strategyPresets.Stocks
    setAnnualReturn(preset.return)
    setAnnualVol(preset.vol)
    setAsset(preset.asset)
    setSignalType(selectSignalType(selectedStrategy.category))
  }, [selectedStrategy])

  const run = async () => {
    setRunning(true)
    setError(null)
    setResult(null)

    try {
      if (dataSource === 'synthetic') {
        const data = runSimulationEngine({
          initialCapital: capital,
          years,
          annualReturn: annualReturn / 100,
          annualVol: annualVol / 100,
          seed: selectedStrategy.id,
        })
        setResult({ data, mode: OperationalMode.simulation })
      } else {
        const historicalData = await fetchYahooHistory(asset, years, proxyUrl || undefined)
        if (historicalData.bars.length < 50) {
          throw new Error('Insufficient historical data for backtest')
        }
        const data = await runHistoricalEngine(asset, years, signalType, proxyUrl)
        setResult({ data, mode: OperationalMode.historical })
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Backtest failed')
    } finally {
      setRunning(false)
    }
  }

  useEffect(() => {
    run()
    // Intentionally run only once on mount to populate the default backtest.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const chartData = useMemo(() => {
    if (!result) return []
    return result.data.dates
      .map((date, i) => ({
        date,
        equity: result.data.equity[i],
        drawdown: result.data.drawdowns[i] * 100,
      }))
      .filter((_, i) => i % Math.max(1, Math.floor(result.data.dates.length / 100)) === 0)
  }, [result])

  const preset = strategyPresets[selectedStrategy.category] || strategyPresets.Stocks
  const isHistorical = result?.mode === OperationalMode.historical
  const signalDescription = isHistorical
    ? (result.data as HistoricalResult).signalDescription
    : ''

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-heading">Backtest Lab</h1>
          <p className="mt-1 text-text">Run synthetic or historical backtests on any strategy in the universe.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Save className="h-4 w-4" />
            Save Report
          </Button>
        </div>
      </div>

      {dataSource === 'synthetic' ? (
        <div className="rounded-xl border border-accent-warning/30 bg-accent-warning/10 p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="mt-0.5 h-5 w-5 text-accent-warning" />
            <div>
              <p className="text-sm font-medium text-accent-warning">Synthetic simulation</p>
              <p className="text-xs text-text">
                Returns are generated via Monte Carlo using assumed annual return and volatility.
                These are not historical results.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-accent-success/30 bg-accent-success/10 p-4">
          <div className="flex items-start gap-3">
            <Database className="mt-0.5 h-5 w-5 text-accent-success" />
            <div>
              <p className="text-sm font-medium text-accent-success">Historical backtest</p>
              <p className="text-xs text-text">
                Prices are fetched from Yahoo Finance. Results reflect a simple strategy overlay on real prices,
                but do not include dividends, fees, slippage, or borrow costs.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-4">
        <Card className="lg:col-span-1">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Settings2 className="h-5 w-5 text-accent" />
              <CardTitle>Parameters</CardTitle>
            </div>
          </CardHeader>
          <div className="space-y-5">
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-text-muted">
                Strategy
              </label>
              <select
                value={selectedStrategyId}
                onChange={(e) => setSelectedStrategyId(Number(e.target.value))}
                className="h-10 w-full rounded-lg border border-border bg-bg-card px-3 text-sm text-text-heading outline-none focus:border-accent"
              >
                {strategies.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.id}. {s.name}
                  </option>
                ))}
              </select>
              <div className="mt-2 flex items-center gap-2 text-xs text-text-muted">
                <Database className="h-3 w-3" />
                {selectedStrategy.category} · Page {selectedStrategy.page}
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-text-muted">
                Data Source
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setDataSource('synthetic')}
                  className={`rounded-lg border py-2 text-xs font-medium transition ${
                    dataSource === 'synthetic'
                      ? 'border-accent bg-accent/10 text-accent'
                      : 'border-border bg-bg-card text-text hover:border-border-strong'
                  }`}
                >
                  Synthetic
                </button>
                <button
                  onClick={() => setDataSource('yahoo')}
                  className={`rounded-lg border py-2 text-xs font-medium transition ${
                    dataSource === 'yahoo'
                      ? 'border-accent-success bg-accent-success/10 text-accent-success'
                      : 'border-border bg-bg-card text-text hover:border-border-strong'
                  }`}
                >
                  Yahoo Finance
                </button>
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-text-muted">
                Asset / Ticker
              </label>
              <input
                type="text"
                value={asset}
                onChange={(e) => setAsset(e.target.value.toUpperCase())}
                placeholder="e.g. SPY, AAPL, BTC-USD"
                className="h-10 w-full rounded-lg border border-border bg-bg-card px-3 text-sm font-mono text-text-heading outline-none focus:border-accent"
              />
              <p className="mt-1 text-xs text-text-muted">Preset for {selectedStrategy.category}: {preset.asset}</p>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-text-muted">
                Timeframe
              </label>
              <div className="grid grid-cols-4 gap-2">
                {timeframes.map((tf) => (
                  <button
                    key={tf.label}
                    onClick={() => setYears(tf.years)}
                    className={`rounded-lg border py-2 text-xs font-medium transition ${
                      years === tf.years
                        ? 'border-accent bg-accent/10 text-accent'
                        : 'border-border bg-bg-card text-text hover:border-border-strong'
                    }`}
                  >
                    {tf.label}
                  </button>
                ))}
              </div>
            </div>

            {dataSource === 'yahoo' && (
              <>
                <div>
                  <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-text-muted">
                    Signal Type
                  </label>
                  <select
                    value={signalType}
                    onChange={(e) => setSignalType(e.target.value as SignalType)}
                    className="h-10 w-full rounded-lg border border-border bg-bg-card px-3 text-sm text-text-heading outline-none focus:border-accent"
                  >
                    {signalOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <p className="mt-1 text-xs text-text-muted">Default for {selectedStrategy.category}</p>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-text-muted">
                    CORS Proxy (optional)
                  </label>
                  <input
                    type="text"
                    value={proxyUrl}
                    onChange={(e) => setProxyUrl(e.target.value)}
                    placeholder="https://corsproxy.io/?"
                    className="h-10 w-full rounded-lg border border-border bg-bg-card px-3 text-sm font-mono text-text-heading outline-none focus:border-accent"
                  />
                  <p className="mt-1 text-xs text-text-muted">Needed if direct Yahoo requests are blocked.</p>
                </div>
              </>
            )}

            {dataSource === 'synthetic' && (
              <>
                <div>
                  <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-text-muted">
                    Expected Annual Return: {annualReturn}%
                  </label>
                  <input
                    type="range"
                    min={-10}
                    max={60}
                    value={annualReturn}
                    onChange={(e) => setAnnualReturn(Number(e.target.value))}
                    className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-bg-hover accent-accent"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-text-muted">
                    Annual Volatility: {annualVol}%
                  </label>
                  <input
                    type="range"
                    min={1}
                    max={80}
                    value={annualVol}
                    onChange={(e) => setAnnualVol(Number(e.target.value))}
                    className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-bg-hover accent-accent"
                  />
                </div>
              </>
            )}

            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-text-muted">
                Initial Capital
              </label>
              <input
                type="number"
                value={capital}
                onChange={(e) => setCapital(Number(e.target.value))}
                className="h-10 w-full rounded-lg border border-border bg-bg-card px-3 text-sm text-text-heading outline-none focus:border-accent"
                step={100000}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={run} disabled={running} className="flex-1">
                <Play className="h-4 w-4" />
                {running ? 'Running...' : dataSource === 'yahoo' ? 'Run Historical' : 'Run Simulation'}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setCapital(1000000)
                  setYears(preset.return === 18 ? 3 : 5)
                  setAnnualReturn(preset.return)
                  setAnnualVol(preset.vol)
                  setAsset(preset.asset)
                  setSignalType(selectSignalType(selectedStrategy.category))
                }}
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>

            {error && (
              <div className="rounded-lg border border-accent-danger/30 bg-accent-danger/10 p-3 text-xs text-accent-danger">
                {error}
              </div>
            )}
          </div>
        </Card>

        <div className="space-y-6 lg:col-span-3">
          {result && (
            <>
              <Card>
                <CardHeader>
                  <div>
                    <CardTitle>Backtest Configuration</CardTitle>
                    <CardSubtitle>
                      {selectedStrategy.name} on {asset} · {years}Y
                      {isHistorical ? ` · ${signalDescription}` : ''}
                    </CardSubtitle>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={isHistorical ? 'success' : 'warning'}>
                      {isHistorical ? 'Historical' : 'Synthetic'}
                    </Badge>
                    <Badge variant="outline">{result.data.provenance}</Badge>
                  </div>
                </CardHeader>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-lg border border-border bg-bg-card p-3">
                    <div className="text-xs text-text-muted">Strategy</div>
                    <div className="font-medium text-text-heading">{selectedStrategy.name}</div>
                  </div>
                  <div className="rounded-lg border border-border bg-bg-card p-3">
                    <div className="text-xs text-text-muted">Asset / Universe</div>
                    <div className="font-mono font-medium text-text-heading">{asset}</div>
                  </div>
                  <div className="rounded-lg border border-border bg-bg-card p-3">
                    <div className="text-xs text-text-muted">Data Source</div>
                    <div className="font-medium text-text-heading">
                      {isHistorical ? 'Yahoo Finance' : 'Monte Carlo'}
                    </div>
                  </div>
                </div>
              </Card>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { label: 'Total Return', value: formatPercent(result.data.metrics.totalReturn), color: result.data.metrics.totalReturn >= 0 ? 'text-accent-success' : 'text-accent-danger' },
                  { label: 'Annualized Return', value: formatPercent(result.data.metrics.annualizedReturn), color: 'text-accent' },
                  { label: 'Volatility', value: formatPercent(result.data.metrics.volatility), color: 'text-accent-warning' },
                  { label: 'Max Drawdown', value: formatPercent(result.data.metrics.maxDrawdown), color: 'text-accent-danger' },
                  { label: 'Sharpe Ratio', value: result.data.metrics.sharpe.toFixed(2), color: 'text-accent-success' },
                  { label: 'Win Rate', value: formatPercent(result.data.metrics.winRate), color: 'text-text-heading' },
                  { label: 'Trades', value: result.data.metrics.trades.toString(), color: 'text-text-heading' },
                  { label: 'Final Equity', value: formatCurrency(result.data.equity[result.data.equity.length - 1]), color: 'text-text-heading' },
                ].map((m) => (
                  <Card key={m.label}>
                    <div className="text-xs text-text-muted">{m.label}</div>
                    <div className={`mt-1 text-2xl font-bold ${m.color}`}>{m.value}</div>
                  </Card>
                ))}
              </div>

              <Card>
                <CardHeader>
                  <div>
                    <CardTitle>Equity Curve</CardTitle>
                    <CardSubtitle>
                      {isHistorical ? 'Historical' : 'Synthetic'} {years}-year performance for {selectedStrategy.name}
                    </CardSubtitle>
                  </div>
                  <Badge variant={result.data.metrics.totalReturn >= 0 ? 'success' : 'danger'}>
                    {formatPercent(result.data.metrics.totalReturn)}
                  </Badge>
                </CardHeader>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="equityGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="date" tickFormatter={(v) => v.slice(0, 7)} minTickGap={30} />
                      <YAxis tickFormatter={(v) => `$${(v / 1e6).toFixed(1)}M`} />
                      <Tooltip
                        contentStyle={{ background: '#15171d', border: '1px solid #23262e', borderRadius: '8px' }}
                        formatter={(value) => formatCurrency(Number(value))}
                        labelFormatter={(label) => label}
                      />
                      <Area
                        type="monotone"
                        dataKey="equity"
                        stroke="#22d3ee"
                        strokeWidth={2}
                        fill="url(#equityGradient)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Assumptions & Provenance</CardTitle>
                  <CardSubtitle>Where these numbers come from</CardSubtitle>
                </CardHeader>
                <ul className="space-y-2 text-sm text-text-muted">
                  {result.data.assumptions.map((assumption, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                      {assumption}
                    </li>
                  ))}
                </ul>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
