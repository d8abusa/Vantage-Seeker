/**
 * Vantage Seeker — System Configuration
 *
 * This file centralizes every hardcoded assumption, preset, and cosmetic
 * constant in the application. No page component should contain a magic
 * number; if you find one, move it here.
 */

import { Provenance, type SignalType } from './model'

/** Trading days per year used throughout the system. */
export const TRADING_DAYS_PER_YEAR = 252

/** Default seed for reproducible synthetic simulations. */
export const DEFAULT_SEED = 42

/** Default initial capital for backtests and portfolios. */
export const DEFAULT_INITIAL_CAPITAL = 1_000_000

/** Default backtest horizon in years. */
export const DEFAULT_YEARS = 5

/** Risk-free rate subtracted in Sharpe ratio calculations. */
export const RISK_FREE_RATE = 0.04

/** Preset return/volatility/asset/rebalance for each strategy category. */
export interface StrategyPreset {
  return: number // percent, e.g. 10 means 10%
  vol: number // percent, e.g. 16 means 16%
  asset: string
  rebalance: string
}

export const strategyPresets: Record<string, StrategyPreset> = {
  Options: { return: 8, vol: 18, asset: 'SPY', rebalance: 'Monthly' },
  Stocks: { return: 10, vol: 16, asset: 'SPY', rebalance: 'Monthly' },
  ETFs: { return: 9, vol: 14, asset: 'SPY', rebalance: 'Monthly' },
  'Fixed Income': { return: 5, vol: 6, asset: 'TLT', rebalance: 'Monthly' },
  Indexes: { return: 9, vol: 15, asset: 'SPY', rebalance: 'Monthly' },
  Volatility: { return: 7, vol: 28, asset: 'VIX', rebalance: 'Weekly' },
  'Foreign Exchange': { return: 6, vol: 9, asset: 'EURUSD=X', rebalance: 'Weekly' },
  Commodities: { return: 6, vol: 20, asset: 'GC=F', rebalance: 'Monthly' },
  Futures: { return: 8, vol: 17, asset: 'ES=F', rebalance: 'Weekly' },
  'Structured Assets': { return: 5, vol: 10, asset: 'CDX', rebalance: 'Monthly' },
  Convertibles: { return: 6, vol: 8, asset: 'CWB', rebalance: 'Monthly' },
  'Tax Arbitrage': { return: 4, vol: 4, asset: 'MUB', rebalance: 'Monthly' },
  'Miscellaneous Assets': { return: 5, vol: 12, asset: 'Custom', rebalance: 'Monthly' },
  'Distressed Assets': { return: 9, vol: 22, asset: 'HYG', rebalance: 'Monthly' },
  'Real Estate': { return: 7, vol: 16, asset: 'VNQ', rebalance: 'Monthly' },
  Cash: { return: 3, vol: 1, asset: 'SHV', rebalance: 'Monthly' },
  Cryptocurrencies: { return: 18, vol: 55, asset: 'BTC-USD', rebalance: 'Daily' },
  'Global Macro': { return: 8, vol: 12, asset: 'DXY', rebalance: 'Monthly' },
}

/** Available historical signal overlays. */
export const signalOptions: { value: SignalType; label: string }[] = [
  { value: 'momentum', label: 'Momentum (20/50 SMA)' },
  { value: 'mean-reversion', label: 'Mean-Reversion (z-score)' },
  { value: 'buy-hold', label: 'Buy & Hold' },
]

/** Asset names used for the random correlation matrix on Analytics. */
export const correlationAssetNames = ['Stocks', 'Options', 'Fixed Income', 'FX', 'Commodities', 'Volatility', 'Crypto']

/** Hardcoded/cosmetic risk metrics shown on the Analytics page. */
export interface HardcodedMetric {
  label: string
  value: string
  sub: string
  provenance: 'cosmetic'
  source: string
}

export const hardcodedRiskMetrics: HardcodedMetric[] = [
  {
    label: 'Portfolio VaR (95%)',
    value: '-2.4%',
    sub: '1-day parametric',
    provenance: Provenance.cosmetic,
    source: 'src/lib/config.ts',
  },
  {
    label: 'Expected Shortfall',
    value: '-3.7%',
    sub: 'CVaR 95%',
    provenance: Provenance.cosmetic,
    source: 'src/lib/config.ts',
  },
  {
    label: 'Beta to S&P 500',
    value: '0.31',
    sub: 'Low market exposure',
    provenance: Provenance.cosmetic,
    source: 'src/lib/config.ts',
  },
  {
    label: 'Stress Loss',
    value: '-12.8%',
    sub: '2008-like scenario',
    provenance: Provenance.cosmetic,
    source: 'src/lib/config.ts',
  },
]

/** Features that are visually present but functionally stubbed. */
export const stubbedFeatures = [
  'Settings API connection status checks (stored config only)',
  'Layout "Data feeds live" badge (always green)',
  'Analytics correlation matrix (random noise, not symmetric)',
]

/** Global assumptions that affect many outputs. */
export const globalAssumptions = [
  `${TRADING_DAYS_PER_YEAR} trading days per year`,
  `Sharpe ratio subtracts a ${(RISK_FREE_RATE * 100).toFixed(0)}% risk-free rate`,
  `Synthetic mode uses a linear congruential RNG (seed=${DEFAULT_SEED} default)`,
  `Synthetic volatility is mean(r²)·√252 (no mean subtraction)`,
]

/** Wizard base assumptions per category (used only to create ranking differentiation). */
export const wizardBaseAssumptions: Record<string, { return: number; vol: number }> = {
  Cryptocurrencies: { return: 0.18, vol: 0.55 },
  'Fixed Income': { return: 0.05, vol: 0.06 },
  default: { return: 0.10, vol: 0.16 },
}
