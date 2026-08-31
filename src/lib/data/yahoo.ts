export interface YahooBar {
  date: string
  open: number
  high: number
  low: number
  close: number
  volume: number
}

export interface HistoricalData {
  ticker: string
  bars: YahooBar[]
}

function buildProxyUrl(proxyBase: string, target: string): string {
  const base = proxyBase.endsWith('/') ? proxyBase.slice(0, -1) : proxyBase
  if (base.includes('?')) {
    return `${base}${encodeURIComponent(target)}`
  }
  return `${base}/${encodeURIComponent(target)}`
}

export async function fetchYahooHistory(
  ticker: string,
  years: number,
  proxyBase?: string
): Promise<HistoricalData> {
  const end = Math.floor(Date.now() / 1000)
  const start = end - Math.floor(years * 365.25 * 24 * 60 * 60)

  const interval = years <= 1 ? '1d' : '1d'
  const targetUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(
    ticker
  )}?period1=${start}&period2=${end}&interval=${interval}&events=history&includeAdjustedClose=true`

  const fetchUrl = proxyBase ? buildProxyUrl(proxyBase, targetUrl) : targetUrl

  const response = await fetch(fetchUrl)
  if (!response.ok) {
    throw new Error(`Yahoo Finance request failed: ${response.status} ${response.statusText}`)
  }

  const json = await response.json()
  const result = json?.chart?.result?.[0]
  if (!result) {
    throw new Error(`No data returned for ${ticker}`)
  }

  const timestamps: number[] = result.timestamp || []
  const quote = result.indicators?.quote?.[0] || {}
  const adjclose = result.indicators?.adjclose?.[0]?.adjclose || quote.close || []
  const opens = quote.open || []
  const highs = quote.high || []
  const lows = quote.low || []
  const volumes = quote.volume || []

  const bars: YahooBar[] = timestamps.map((ts: number, i: number) => ({
    date: new Date(ts * 1000).toISOString().split('T')[0],
    open: opens[i] ?? 0,
    high: highs[i] ?? 0,
    low: lows[i] ?? 0,
    close: adjclose[i] ?? quote.close?.[i] ?? 0,
    volume: volumes[i] ?? 0,
  }))

  return { ticker, bars }
}
