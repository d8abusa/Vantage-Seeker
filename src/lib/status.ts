/**
 * Vantage Seeker — Runtime Status
 *
 * A single, queryable source of truth for what the system is actually doing
 * right now. Use this instead of trusting UI badges.
 */

import { strategies } from '@/data/strategies'
import {
  globalAssumptions,
  hardcodedRiskMetrics,
  stubbedFeatures,
} from './config'
import { OperationalMode, Provenance, type SystemStatus } from './model'

const API_KEYS_STORAGE_KEY = 'vantage_api_keys'
const PROXY_STORAGE_KEY = 'vantage_yahoo_proxy'

function hasApiKeys(): boolean {
  if (typeof window === 'undefined') return false
  try {
    const raw = localStorage.getItem(API_KEYS_STORAGE_KEY)
    if (!raw) return false
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) && parsed.length > 0
  } catch {
    return false
  }
}

function hasProxy(): boolean {
  if (typeof window === 'undefined') return false
  const proxy = localStorage.getItem(PROXY_STORAGE_KEY)
  return typeof proxy === 'string' && proxy.length > 0
}

/**
 * Get the current runtime status of the system.
 *
 * @param mode optional override; defaults to research if not provided
 */
export function getSystemStatus(mode: OperationalMode = OperationalMode.research): SystemStatus {
  const yahooConfigured = hasProxy() || hasApiKeys()

  return {
    mode,
    strategiesLoaded: strategies.length,
    sources: [
      {
        name: 'SSRN-3247865 strategy catalog',
        connected: true,
        provenance: Provenance.real,
        note: 'Frozen at build time from Kakushadze & Serur (2018)',
      },
      {
        name: 'Yahoo Finance',
        connected: yahooConfigured,
        provenance: Provenance.real,
        note: yahooConfigured
          ? 'Proxy or API config present; actual reachability not verified'
          : 'No CORS proxy or API config configured',
      },
      {
        name: 'Brokerage / data-provider APIs',
        connected: false,
        provenance: Provenance.config,
        note: 'Config is stored locally; no live execution adapter exists',
      },
    ],
    cosmeticMetrics: [
      'Analytics VaR/ES/stress-loss/beta are hardcoded literals',
      'Synthetic mode trade count is floor(days * 0.6)',
      'Analytics correlation matrix is random noise',
    ],
    hardcodedAssumptions: globalAssumptions,
    stubbedFeatures,
    lastError: null,
  }
}

/**
 * Human-readable summary of the current mode.
 */
export function describeMode(mode: OperationalMode): string {
  switch (mode) {
    case OperationalMode.research:
      return 'Research — browsing the static strategy catalog'
    case OperationalMode.simulation:
      return 'Simulation — running parametric GBM backtests'
    case OperationalMode.historical:
      return 'Historical — running signal overlays on Yahoo Finance prices'
    case OperationalMode.config:
      return 'Config — editing settings and API keys'
    default:
      return 'Unknown mode'
  }
}

export { hardcodedRiskMetrics }
