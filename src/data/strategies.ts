export interface Strategy {
  id: number;
  name: string;
  category: string;
  slug: string;
  complexity: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  formulas: string[];
  tags: string[];
  page: number;
}

export const categories = {
  "Options": {
    "icon": "TrendingUp",
    "color": "accent"
  },
  "Stocks": {
    "icon": "BarChart3",
    "color": "accent-success"
  },
  "ETFs": {
    "icon": "Layers",
    "color": "accent-blue"
  },
  "Fixed Income": {
    "icon": "Landmark",
    "color": "accent-warning"
  },
  "Indexes": {
    "icon": "PieChart",
    "color": "accent-secondary"
  },
  "Volatility": {
    "icon": "Activity",
    "color": "accent-danger"
  },
  "Foreign Exchange": {
    "icon": "Globe",
    "color": "accent"
  },
  "Commodities": {
    "icon": "Wheat",
    "color": "accent-warning"
  },
  "Futures": {
    "icon": "Timer",
    "color": "accent-blue"
  },
  "Structured Assets": {
    "icon": "Building2",
    "color": "accent-secondary"
  },
  "Convertibles": {
    "icon": "RefreshCw",
    "color": "accent-success"
  },
  "Tax Arbitrage": {
    "icon": "Receipt",
    "color": "accent-warning"
  },
  "Miscellaneous Assets": {
    "icon": "Briefcase",
    "color": "accent"
  },
  "Distressed Assets": {
    "icon": "AlertTriangle",
    "color": "accent-danger"
  },
  "Real Estate": {
    "icon": "Home",
    "color": "accent-success"
  },
  "Cash": {
    "icon": "Banknote",
    "color": "accent-warning"
  },
  "Cryptocurrencies": {
    "icon": "Bitcoin",
    "color": "accent-secondary"
  },
  "Global Macro": {
    "icon": "Globe2",
    "color": "accent-blue"
  }
} as const;

export const strategies: Strategy[] = [
  {
    "id": 1,
    "name": "Covered call",
    "category": "Options",
    "slug": "options-covered-call",
    "complexity": "Beginner",
    "description": "An income strategy that owns the underlying asset and sells a call option against it, collecting premium while capping upside.",
    "formulas": [
      "\\Pi_T = S_T - S_0 - (S_T - K)^+ + C",
      "\\text{Max profit} = K - S_0 + C",
      "\\text{Breakeven} = S_0 - C"
    ],
    "tags": [
      "Options",
      "Income",
      "Covered"
    ],
    "page": 18
  },
  {
    "id": 2,
    "name": "Covered put",
    "category": "Options",
    "slug": "options-covered-put",
    "complexity": "Intermediate",
    "description": "A options-focused implementation of the Covered put strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Options"
    ],
    "page": 1
  },
  {
    "id": 3,
    "name": "Protective put",
    "category": "Options",
    "slug": "options-protective-put",
    "complexity": "Intermediate",
    "description": "A options-focused implementation of the Protective put strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Options"
    ],
    "page": 1
  },
  {
    "id": 4,
    "name": "Protective call",
    "category": "Options",
    "slug": "options-protective-call",
    "complexity": "Intermediate",
    "description": "A options-focused implementation of the Protective call strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Options"
    ],
    "page": 1
  },
  {
    "id": 5,
    "name": "Bull call spread",
    "category": "Options",
    "slug": "options-bull-call-spread",
    "complexity": "Intermediate",
    "description": "A bullish vertical spread that buys a lower-strike call and sells a higher-strike call to reduce cost and cap risk.",
    "formulas": [
      "\\Pi_T = (S_T - K_1)^+ - (S_T - K_2)^+ - C_1 + C_2",
      "K_1 < K_2",
      "\\text{Max profit} = K_2 - K_1 - (C_1 - C_2)"
    ],
    "tags": [
      "Options",
      "Bullish",
      "Spread"
    ],
    "page": 19
  },
  {
    "id": 6,
    "name": "Bull put spread",
    "category": "Options",
    "slug": "options-bull-put-spread",
    "complexity": "Intermediate",
    "description": "A options-focused implementation of the Bull put spread strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Options"
    ],
    "page": 1
  },
  {
    "id": 7,
    "name": "Bear call spread",
    "category": "Options",
    "slug": "options-bear-call-spread",
    "complexity": "Intermediate",
    "description": "A options-focused implementation of the Bear call spread strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Options"
    ],
    "page": 1
  },
  {
    "id": 8,
    "name": "Bear put spread",
    "category": "Options",
    "slug": "options-bear-put-spread",
    "complexity": "Intermediate",
    "description": "A options-focused implementation of the Bear put spread strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Options"
    ],
    "page": 1
  },
  {
    "id": 9,
    "name": "Long synthetic forward",
    "category": "Options",
    "slug": "options-long-synthetic-forward",
    "complexity": "Intermediate",
    "description": "A options-focused implementation of the Long synthetic forward strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Options"
    ],
    "page": 1
  },
  {
    "id": 10,
    "name": "Short synthetic forward",
    "category": "Options",
    "slug": "options-short-synthetic-forward",
    "complexity": "Intermediate",
    "description": "A options-focused implementation of the Short synthetic forward strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Options"
    ],
    "page": 1
  },
  {
    "id": 11,
    "name": "Long combo",
    "category": "Options",
    "slug": "options-long-combo",
    "complexity": "Intermediate",
    "description": "A options-focused implementation of the Long combo strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Options"
    ],
    "page": 1
  },
  {
    "id": 12,
    "name": "Short combo",
    "category": "Options",
    "slug": "options-short-combo",
    "complexity": "Intermediate",
    "description": "A options-focused implementation of the Short combo strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Options"
    ],
    "page": 1
  },
  {
    "id": 13,
    "name": "Bull call ladder",
    "category": "Options",
    "slug": "options-bull-call-ladder",
    "complexity": "Intermediate",
    "description": "A options-focused implementation of the Bull call ladder strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Options"
    ],
    "page": 1
  },
  {
    "id": 14,
    "name": "Bull put ladder",
    "category": "Options",
    "slug": "options-bull-put-ladder",
    "complexity": "Intermediate",
    "description": "A options-focused implementation of the Bull put ladder strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Options"
    ],
    "page": 1
  },
  {
    "id": 15,
    "name": "Bear call ladder",
    "category": "Options",
    "slug": "options-bear-call-ladder",
    "complexity": "Intermediate",
    "description": "A options-focused implementation of the Bear call ladder strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Options"
    ],
    "page": 1
  },
  {
    "id": 16,
    "name": "Bear put ladder",
    "category": "Options",
    "slug": "options-bear-put-ladder",
    "complexity": "Intermediate",
    "description": "A options-focused implementation of the Bear put ladder strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Options"
    ],
    "page": 1
  },
  {
    "id": 17,
    "name": "Calendar call spread",
    "category": "Options",
    "slug": "options-calendar-call-spread",
    "complexity": "Intermediate",
    "description": "A options-focused implementation of the Calendar call spread strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Options"
    ],
    "page": 1
  },
  {
    "id": 18,
    "name": "Calendar put spread",
    "category": "Options",
    "slug": "options-calendar-put-spread",
    "complexity": "Intermediate",
    "description": "A options-focused implementation of the Calendar put spread strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Options"
    ],
    "page": 1
  },
  {
    "id": 19,
    "name": "Diagonal call spread",
    "category": "Options",
    "slug": "options-diagonal-call-spread",
    "complexity": "Intermediate",
    "description": "A options-focused implementation of the Diagonal call spread strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Options"
    ],
    "page": 1
  },
  {
    "id": 20,
    "name": "Diagonal put spread",
    "category": "Options",
    "slug": "options-diagonal-put-spread",
    "complexity": "Intermediate",
    "description": "A options-focused implementation of the Diagonal put spread strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Options"
    ],
    "page": 1
  },
  {
    "id": 21,
    "name": "Long straddle",
    "category": "Options",
    "slug": "options-long-straddle",
    "complexity": "Intermediate",
    "description": "A volatility strategy that buys an at-the-money call and an at-the-money put with the same strike and expiration. Profits from large moves in either direction.",
    "formulas": [
      "\\Pi_T = |S_T - K| - C - P",
      "P\\&L > 0 \\iff |S_T - K| > C + P",
      "\\text{Max loss} = C + P"
    ],
    "tags": [
      "Options",
      "Volatility",
      "Long Vega"
    ],
    "page": 26
  },
  {
    "id": 22,
    "name": "Long strangle",
    "category": "Options",
    "slug": "options-long-strangle",
    "complexity": "Intermediate",
    "description": "A options-focused implementation of the Long strangle strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Options"
    ],
    "page": 1
  },
  {
    "id": 23,
    "name": "Long guts",
    "category": "Options",
    "slug": "options-long-guts",
    "complexity": "Intermediate",
    "description": "A options-focused implementation of the Long guts strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Options"
    ],
    "page": 1
  },
  {
    "id": 24,
    "name": "Short straddle",
    "category": "Options",
    "slug": "options-short-straddle",
    "complexity": "Intermediate",
    "description": "A options-focused implementation of the Short straddle strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Options"
    ],
    "page": 1
  },
  {
    "id": 25,
    "name": "Short strangle",
    "category": "Options",
    "slug": "options-short-strangle",
    "complexity": "Intermediate",
    "description": "A options-focused implementation of the Short strangle strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Options"
    ],
    "page": 1
  },
  {
    "id": 26,
    "name": "Short guts",
    "category": "Options",
    "slug": "options-short-guts",
    "complexity": "Intermediate",
    "description": "A options-focused implementation of the Short guts strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Options"
    ],
    "page": 1
  },
  {
    "id": 27,
    "name": "Long call synthetic straddle",
    "category": "Options",
    "slug": "options-long-call-synthetic-straddle",
    "complexity": "Intermediate",
    "description": "A options-focused implementation of the Long call synthetic straddle strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Options"
    ],
    "page": 1
  },
  {
    "id": 28,
    "name": "Long put synthetic straddle",
    "category": "Options",
    "slug": "options-long-put-synthetic-straddle",
    "complexity": "Intermediate",
    "description": "A options-focused implementation of the Long put synthetic straddle strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Options"
    ],
    "page": 1
  },
  {
    "id": 29,
    "name": "Short call synthetic straddle",
    "category": "Options",
    "slug": "options-short-call-synthetic-straddle",
    "complexity": "Intermediate",
    "description": "A options-focused implementation of the Short call synthetic straddle strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Options"
    ],
    "page": 1
  },
  {
    "id": 30,
    "name": "Short put synthetic straddle",
    "category": "Options",
    "slug": "options-short-put-synthetic-straddle",
    "complexity": "Intermediate",
    "description": "A options-focused implementation of the Short put synthetic straddle strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Options"
    ],
    "page": 1
  },
  {
    "id": 31,
    "name": "Covered short straddle",
    "category": "Options",
    "slug": "options-covered-short-straddle",
    "complexity": "Intermediate",
    "description": "A options-focused implementation of the Covered short straddle strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Options"
    ],
    "page": 1
  },
  {
    "id": 32,
    "name": "Covered short strangle",
    "category": "Options",
    "slug": "options-covered-short-strangle",
    "complexity": "Intermediate",
    "description": "A options-focused implementation of the Covered short strangle strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Options"
    ],
    "page": 1
  },
  {
    "id": 33,
    "name": "Strap",
    "category": "Options",
    "slug": "options-strap",
    "complexity": "Intermediate",
    "description": "A options-focused implementation of the Strap strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Options"
    ],
    "page": 1
  },
  {
    "id": 34,
    "name": "Strip",
    "category": "Options",
    "slug": "options-strip",
    "complexity": "Intermediate",
    "description": "A options-focused implementation of the Strip strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Options"
    ],
    "page": 1
  },
  {
    "id": 35,
    "name": "Call ratio backspread",
    "category": "Options",
    "slug": "options-call-ratio-backspread",
    "complexity": "Intermediate",
    "description": "A options-focused implementation of the Call ratio backspread strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Options"
    ],
    "page": 1
  },
  {
    "id": 36,
    "name": "Put ratio backspread",
    "category": "Options",
    "slug": "options-put-ratio-backspread",
    "complexity": "Intermediate",
    "description": "A options-focused implementation of the Put ratio backspread strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Options"
    ],
    "page": 1
  },
  {
    "id": 37,
    "name": "Ratio call spread",
    "category": "Options",
    "slug": "options-ratio-call-spread",
    "complexity": "Intermediate",
    "description": "A options-focused implementation of the Ratio call spread strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Options"
    ],
    "page": 1
  },
  {
    "id": 38,
    "name": "Ratio put spread",
    "category": "Options",
    "slug": "options-ratio-put-spread",
    "complexity": "Intermediate",
    "description": "A options-focused implementation of the Ratio put spread strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Options"
    ],
    "page": 1
  },
  {
    "id": 39,
    "name": "Long call butterfly",
    "category": "Options",
    "slug": "options-long-call-butterfly",
    "complexity": "Intermediate",
    "description": "A options-focused implementation of the Long call butterfly strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Options"
    ],
    "page": 1
  },
  {
    "id": 40,
    "name": "Long put butterfly",
    "category": "Options",
    "slug": "options-long-put-butterfly",
    "complexity": "Intermediate",
    "description": "A options-focused implementation of the Long put butterfly strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Options"
    ],
    "page": 1
  },
  {
    "id": 41,
    "name": "Short call butterfly",
    "category": "Options",
    "slug": "options-short-call-butterfly",
    "complexity": "Intermediate",
    "description": "A options-focused implementation of the Short call butterfly strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Options"
    ],
    "page": 1
  },
  {
    "id": 42,
    "name": "Short put butterfly",
    "category": "Options",
    "slug": "options-short-put-butterfly",
    "complexity": "Intermediate",
    "description": "A options-focused implementation of the Short put butterfly strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Options"
    ],
    "page": 1
  },
  {
    "id": 43,
    "name": "Long iron butterfly",
    "category": "Options",
    "slug": "options-long-iron-butterfly",
    "complexity": "Intermediate",
    "description": "A options-focused implementation of the Long iron butterfly strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Options"
    ],
    "page": 1
  },
  {
    "id": 44,
    "name": "Short iron butterfly",
    "category": "Options",
    "slug": "options-short-iron-butterfly",
    "complexity": "Intermediate",
    "description": "A options-focused implementation of the Short iron butterfly strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Options"
    ],
    "page": 1
  },
  {
    "id": 45,
    "name": "Long call condor",
    "category": "Options",
    "slug": "options-long-call-condor",
    "complexity": "Intermediate",
    "description": "A options-focused implementation of the Long call condor strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Options"
    ],
    "page": 1
  },
  {
    "id": 46,
    "name": "Long put condor",
    "category": "Options",
    "slug": "options-long-put-condor",
    "complexity": "Intermediate",
    "description": "A options-focused implementation of the Long put condor strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Options"
    ],
    "page": 1
  },
  {
    "id": 47,
    "name": "Short call condor",
    "category": "Options",
    "slug": "options-short-call-condor",
    "complexity": "Intermediate",
    "description": "A options-focused implementation of the Short call condor strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Options"
    ],
    "page": 1
  },
  {
    "id": 48,
    "name": "Short put condor",
    "category": "Options",
    "slug": "options-short-put-condor",
    "complexity": "Intermediate",
    "description": "A options-focused implementation of the Short put condor strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Options"
    ],
    "page": 1
  },
  {
    "id": 49,
    "name": "Long iron condor",
    "category": "Options",
    "slug": "options-long-iron-condor",
    "complexity": "Intermediate",
    "description": "A options-focused implementation of the Long iron condor strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Options"
    ],
    "page": 1
  },
  {
    "id": 50,
    "name": "Short iron condor",
    "category": "Options",
    "slug": "options-short-iron-condor",
    "complexity": "Intermediate",
    "description": "A options-focused implementation of the Short iron condor strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Options"
    ],
    "page": 1
  },
  {
    "id": 51,
    "name": "Long box",
    "category": "Options",
    "slug": "options-long-box",
    "complexity": "Intermediate",
    "description": "A options-focused implementation of the Long box strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Options"
    ],
    "page": 1
  },
  {
    "id": 52,
    "name": "Collar",
    "category": "Options",
    "slug": "options-collar",
    "complexity": "Intermediate",
    "description": "A options-focused implementation of the Collar strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Options"
    ],
    "page": 1
  },
  {
    "id": 53,
    "name": "Bullish short seagull spread",
    "category": "Options",
    "slug": "options-bullish-short-seagull-spread",
    "complexity": "Intermediate",
    "description": "A options-focused implementation of the Bullish short seagull spread strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Options"
    ],
    "page": 1
  },
  {
    "id": 54,
    "name": "Bearish long seagull spread",
    "category": "Options",
    "slug": "options-bearish-long-seagull-spread",
    "complexity": "Intermediate",
    "description": "A options-focused implementation of the Bearish long seagull spread strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Options"
    ],
    "page": 1
  },
  {
    "id": 55,
    "name": "Bearish short seagull spread",
    "category": "Options",
    "slug": "options-bearish-short-seagull-spread",
    "complexity": "Intermediate",
    "description": "A options-focused implementation of the Bearish short seagull spread strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Options"
    ],
    "page": 1
  },
  {
    "id": 56,
    "name": "Bullish long seagull spread",
    "category": "Options",
    "slug": "options-bullish-long-seagull-spread",
    "complexity": "Intermediate",
    "description": "A options-focused implementation of the Bullish long seagull spread strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Options"
    ],
    "page": 1
  },
  {
    "id": 57,
    "name": "Price-momentum",
    "category": "Stocks",
    "slug": "stocks-price-momentum",
    "complexity": "Intermediate",
    "description": "The price-momentum strategy exploits the empirical 'inertia' in stock returns. Traders buy the best-performing stocks (winners) and sell the worst-performing stocks (losers) based on cumulative, mean, or risk-adjusted returns over a formation period, typically skipping the most recent month to avoid short-term mean-reversion.",
    "formulas": [
      "R_i(t) = \\frac{P_i(t)}{P_i(t+1)} - 1",
      "R_i^{cum} = \\frac{P_i(S)}{P_i(S+T)} - 1",
      "R_i^{mean} = \\frac{1}{T} \\sum_{t=S}^{S+T-1} R_i(t)",
      "R_i^{risk.adj} = \\frac{R_i^{mean}}{\\sigma_i}",
      "\\sigma_i^2 = \\frac{1}{T-1} \\sum_{t=S}^{S+T-1} \\left(R_i(t) - R_i^{mean}\\right)^2",
      "\\sum_{i=1}^{N} w_i = 1 \\quad (\\text{long-only}); \\quad \\sum_{i=1}^{N} |w_i| = 1, \\; \\sum_{i=1}^{N} w_i = 0 \\quad (\\text{dollar-neutral})"
    ],
    "tags": [
      "Stocks",
      "Momentum",
      "Long/Short",
      "Factor"
    ],
    "page": 40
  },
  {
    "id": 58,
    "name": "Earnings-momentum",
    "category": "Stocks",
    "slug": "stocks-earnings-momentum",
    "complexity": "Intermediate",
    "description": "Similar to price-momentum, but selection is based on earnings surprises and revisions rather than past prices. Stocks with positive earnings surprises tend to drift upward (post-earnings-announcement drift), while negative surprises drift downward.",
    "formulas": [
      "SUE_i = \\frac{EPS_i^{actual} - EPS_i^{expected}}{\\sigma(EPS_i^{expected})}",
      "\\Delta EPS_i^{forecast} = EPS_i^{current forecast} - EPS_i^{prior forecast}"
    ],
    "tags": [
      "Stocks",
      "Earnings",
      "Event-Driven"
    ],
    "page": 41
  },
  {
    "id": 59,
    "name": "Value",
    "category": "Stocks",
    "slug": "stocks-value",
    "complexity": "Beginner",
    "description": "Value investing selects stocks with low prices relative to fundamentals such as book value, earnings, or cash flow. The strategy is predicated on mean-reversion in valuation ratios.",
    "formulas": [
      "BM_i = \\frac{Book Value_i}{Market Cap_i}",
      "PE_i = \\frac{Price_i}{Earnings_i}",
      "z_i = \\frac{BM_i - \\mu_{BM}}{\\sigma_{BM}}"
    ],
    "tags": [
      "Stocks",
      "Value",
      "Factor"
    ],
    "page": 42
  },
  {
    "id": 60,
    "name": "Low-volatility anomaly",
    "category": "Stocks",
    "slug": "stocks-low-volatility-anomaly",
    "complexity": "Intermediate",
    "description": "A stocks-focused implementation of the Low-volatility anomaly strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Stocks"
    ],
    "page": 1
  },
  {
    "id": 61,
    "name": "Implied volatility",
    "category": "Stocks",
    "slug": "stocks-implied-volatility",
    "complexity": "Intermediate",
    "description": "A stocks-focused implementation of the Implied volatility strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Stocks"
    ],
    "page": 1
  },
  {
    "id": 62,
    "name": "Multifactor portfolio",
    "category": "Stocks",
    "slug": "stocks-multifactor-portfolio",
    "complexity": "Intermediate",
    "description": "A stocks-focused implementation of the Multifactor portfolio strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Stocks"
    ],
    "page": 1
  },
  {
    "id": 63,
    "name": "Residual momentum",
    "category": "Stocks",
    "slug": "stocks-residual-momentum",
    "complexity": "Intermediate",
    "description": "A stocks-focused implementation of the Residual momentum strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Stocks"
    ],
    "page": 1
  },
  {
    "id": 64,
    "name": "Pairs trading",
    "category": "Stocks",
    "slug": "stocks-pairs-trading",
    "complexity": "Advanced",
    "description": "A market-neutral statistical arbitrage strategy that identifies pairs of co-moving securities and trades the divergence from their historical spread.",
    "formulas": [
      "\\hat{\\beta} = \\frac{Cov(R_A, R_B)}{Var(R_B)}",
      "\\varepsilon_t = P_t^A - \\beta P_t^B - \\alpha",
      "Z_t = \\frac{\\varepsilon_t - \\mu_\\varepsilon}{\\sigma_\\varepsilon}"
    ],
    "tags": [
      "Stocks",
      "Statistical Arbitrage",
      "Mean-Reversion"
    ],
    "page": 45
  },
  {
    "id": 65,
    "name": "Mean-reversion \u2013 single cluster",
    "category": "Stocks",
    "slug": "stocks-mean-reversion---single-cluster",
    "complexity": "Intermediate",
    "description": "A stock mean-reversion strategy that assumes prices revert to a single equilibrium level, often estimated from recent historical prices.",
    "formulas": [
      "\\mu = \\frac{1}{T} \\sum_{t=1}^{T} P(t)",
      "Z_t = \\frac{P_t - \\mu}{\\sigma}",
      "\\text{Signal} = -\\text{sign}(Z_t)"
    ],
    "tags": [
      "Stocks",
      "Mean-Reversion"
    ],
    "page": 46
  },
  {
    "id": 66,
    "name": "Mean-reversion \u2013 multiple clusters",
    "category": "Stocks",
    "slug": "stocks-mean-reversion---multiple-clusters",
    "complexity": "Intermediate",
    "description": "A stocks-focused implementation of the Mean-reversion \u2013 multiple clusters strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Stocks"
    ],
    "page": 1
  },
  {
    "id": 67,
    "name": "Mean-reversion \u2013 weighted regression",
    "category": "Stocks",
    "slug": "stocks-mean-reversion---weighted-regression",
    "complexity": "Intermediate",
    "description": "A stocks-focused implementation of the Mean-reversion \u2013 weighted regression strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Stocks"
    ],
    "page": 1
  },
  {
    "id": 68,
    "name": "Single moving average",
    "category": "Stocks",
    "slug": "stocks-single-moving-average",
    "complexity": "Intermediate",
    "description": "A stocks-focused implementation of the Single moving average strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Stocks"
    ],
    "page": 1
  },
  {
    "id": 69,
    "name": "Two moving averages",
    "category": "Stocks",
    "slug": "stocks-two-moving-averages",
    "complexity": "Intermediate",
    "description": "A stocks-focused implementation of the Two moving averages strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Stocks"
    ],
    "page": 1
  },
  {
    "id": 70,
    "name": "Three moving averages",
    "category": "Stocks",
    "slug": "stocks-three-moving-averages",
    "complexity": "Intermediate",
    "description": "A stocks-focused implementation of the Three moving averages strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Stocks"
    ],
    "page": 1
  },
  {
    "id": 71,
    "name": "Support and resistance",
    "category": "Stocks",
    "slug": "stocks-support-and-resistance",
    "complexity": "Intermediate",
    "description": "A stocks-focused implementation of the Support and resistance strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Stocks"
    ],
    "page": 1
  },
  {
    "id": 72,
    "name": "Channel",
    "category": "Stocks",
    "slug": "stocks-channel",
    "complexity": "Intermediate",
    "description": "A stocks-focused implementation of the Channel strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Stocks"
    ],
    "page": 1
  },
  {
    "id": 73,
    "name": "Event-driven \u2013 M&A",
    "category": "Stocks",
    "slug": "stocks-event-driven---manda",
    "complexity": "Intermediate",
    "description": "A stocks-focused implementation of the Event-driven \u2013 M&A strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Stocks"
    ],
    "page": 1
  },
  {
    "id": 74,
    "name": "Machine learning \u2013 single-stock KNN",
    "category": "Stocks",
    "slug": "stocks-machine-learning---single-stock-knn",
    "complexity": "Advanced",
    "description": "A single-stock machine-learning strategy that uses k-nearest neighbors to forecast future returns based on normalized technical features such as moving averages of price and volume.",
    "formulas": [
      "Y(t) = \\frac{P(t-T)}{P(t)} - 1",
      "X_1(t) = \\frac{1}{T_1} \\sum_{s=1}^{T_1} V(t+s)",
      "X_2(t) = \\frac{1}{T_2} \\sum_{s=1}^{T_2} P(t+s)",
      "\\tilde{X}_a(t) = \\frac{X_a(t) - X_a^-}{X_a^+ - X_a^-}",
      "[D(t,t')]^2 = \\sum_{a=1}^{m} \\left(\\tilde{X}_a(t) - \\tilde{X}_a(t')\\right)^2"
    ],
    "tags": [
      "Stocks",
      "Machine Learning",
      "KNN"
    ],
    "page": 53
  },
  {
    "id": 75,
    "name": "Statistical arbitrage \u2013 optimization",
    "category": "Stocks",
    "slug": "stocks-statistical-arbitrage---optimization",
    "complexity": "Advanced",
    "description": "A portfolio-level statistical arbitrage strategy constructed via constrained optimization, often enforcing dollar-neutrality and factor neutrality.",
    "formulas": [
      "\\max_w \\alpha^T w - \\lambda w^T \\Sigma w",
      "\\text{s.t. } \\sum_i w_i = 0, \\; \\sum_i |w_i| = 1",
      "w^T F = 0"
    ],
    "tags": [
      "Stocks",
      "Statistical Arbitrage",
      "Optimization"
    ],
    "page": 55
  },
  {
    "id": 76,
    "name": "Market-making",
    "category": "Stocks",
    "slug": "stocks-market-making",
    "complexity": "Intermediate",
    "description": "A stocks-focused implementation of the Market-making strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Stocks"
    ],
    "page": 1
  },
  {
    "id": 77,
    "name": "Alpha combos",
    "category": "Stocks",
    "slug": "stocks-alpha-combos",
    "complexity": "Intermediate",
    "description": "A stocks-focused implementation of the Alpha combos strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Stocks"
    ],
    "page": 1
  },
  {
    "id": 78,
    "name": "Sector momentum rotation",
    "category": "ETFs",
    "slug": "etfs-sector-momentum-rotation",
    "complexity": "Intermediate",
    "description": "An ETF strategy that rotates capital into sectors with the strongest recent momentum, often using moving-average filters to avoid bear-market exposure.",
    "formulas": [
      "R_s^{cum} = \\prod_{t=1}^{T} (1 + R_s(t)) - 1",
      "\\text{Long top } k \\text{ sectors by } R_s^{cum}",
      "\\text{MA filter: enter only if } P_s > MA_s(T)"
    ],
    "tags": [
      "ETFs",
      "Momentum",
      "Sector Rotation"
    ],
    "page": 61
  },
  {
    "id": 79,
    "name": "Sector momentum rotation with MA filter",
    "category": "ETFs",
    "slug": "etfs-sector-momentum-rotation-with-ma-filter",
    "complexity": "Intermediate",
    "description": "A etfs-focused implementation of the Sector momentum rotation with MA filter strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "ETFs"
    ],
    "page": 1
  },
  {
    "id": 80,
    "name": "Dual-momentum sector rotation",
    "category": "ETFs",
    "slug": "etfs-dual-momentum-sector-rotation",
    "complexity": "Intermediate",
    "description": "A etfs-focused implementation of the Dual-momentum sector rotation strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "ETFs"
    ],
    "page": 1
  },
  {
    "id": 81,
    "name": "Alpha rotation",
    "category": "ETFs",
    "slug": "etfs-alpha-rotation",
    "complexity": "Intermediate",
    "description": "A etfs-focused implementation of the Alpha rotation strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "ETFs"
    ],
    "page": 1
  },
  {
    "id": 82,
    "name": "R-squared",
    "category": "ETFs",
    "slug": "etfs-r-squared",
    "complexity": "Intermediate",
    "description": "A etfs-focused implementation of the R-squared strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "ETFs"
    ],
    "page": 1
  },
  {
    "id": 83,
    "name": "Mean-reversion",
    "category": "ETFs",
    "slug": "etfs-mean-reversion",
    "complexity": "Intermediate",
    "description": "A etfs-focused implementation of the Mean-reversion strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "ETFs"
    ],
    "page": 1
  },
  {
    "id": 84,
    "name": "Leveraged ETFs (LETFs)",
    "category": "ETFs",
    "slug": "etfs-leveraged-etfs-letfs",
    "complexity": "Intermediate",
    "description": "A etfs-focused implementation of the Leveraged ETFs (LETFs) strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "ETFs"
    ],
    "page": 1
  },
  {
    "id": 85,
    "name": "Multi-asset trend following",
    "category": "ETFs",
    "slug": "etfs-multi-asset-trend-following",
    "complexity": "Intermediate",
    "description": "A etfs-focused implementation of the Multi-asset trend following strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "ETFs"
    ],
    "page": 1
  },
  {
    "id": 86,
    "name": "Bullets",
    "category": "Fixed Income",
    "slug": "fixed-income-bullets",
    "complexity": "Intermediate",
    "description": "A fixed income-focused implementation of the Bullets strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Fixed"
    ],
    "page": 1
  },
  {
    "id": 87,
    "name": "Barbells",
    "category": "Fixed Income",
    "slug": "fixed-income-barbells",
    "complexity": "Intermediate",
    "description": "A fixed income-focused implementation of the Barbells strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Fixed"
    ],
    "page": 1
  },
  {
    "id": 88,
    "name": "Ladders",
    "category": "Fixed Income",
    "slug": "fixed-income-ladders",
    "complexity": "Intermediate",
    "description": "A fixed income-focused implementation of the Ladders strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Fixed"
    ],
    "page": 1
  },
  {
    "id": 89,
    "name": "Bond immunization",
    "category": "Fixed Income",
    "slug": "fixed-income-bond-immunization",
    "complexity": "Intermediate",
    "description": "A fixed income-focused implementation of the Bond immunization strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Fixed"
    ],
    "page": 1
  },
  {
    "id": 90,
    "name": "Dollar-duration-neutral butterfly",
    "category": "Fixed Income",
    "slug": "fixed-income-dollar-duration-neutral-butterfly",
    "complexity": "Intermediate",
    "description": "A fixed income-focused implementation of the Dollar-duration-neutral butterfly strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Fixed"
    ],
    "page": 1
  },
  {
    "id": 91,
    "name": "Fifty-fifty butterfly",
    "category": "Fixed Income",
    "slug": "fixed-income-fifty-fifty-butterfly",
    "complexity": "Intermediate",
    "description": "A fixed income-focused implementation of the Fifty-fifty butterfly strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Fixed"
    ],
    "page": 1
  },
  {
    "id": 92,
    "name": "Regression-weighted butterfly",
    "category": "Fixed Income",
    "slug": "fixed-income-regression-weighted-butterfly",
    "complexity": "Intermediate",
    "description": "A fixed income-focused implementation of the Regression-weighted butterfly strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Fixed"
    ],
    "page": 1
  },
  {
    "id": 93,
    "name": "Maturity-weighted butterfly",
    "category": "Fixed Income",
    "slug": "fixed-income-maturity-weighted-butterfly",
    "complexity": "Intermediate",
    "description": "A fixed income-focused implementation of the Maturity-weighted butterfly strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Fixed"
    ],
    "page": 1
  },
  {
    "id": 94,
    "name": "Low-risk factor",
    "category": "Fixed Income",
    "slug": "fixed-income-low-risk-factor",
    "complexity": "Intermediate",
    "description": "A fixed income-focused implementation of the Low-risk factor strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Fixed"
    ],
    "page": 1
  },
  {
    "id": 95,
    "name": "Value factor",
    "category": "Fixed Income",
    "slug": "fixed-income-value-factor",
    "complexity": "Intermediate",
    "description": "A fixed income-focused implementation of the Value factor strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Fixed"
    ],
    "page": 1
  },
  {
    "id": 96,
    "name": "Carry factor",
    "category": "Fixed Income",
    "slug": "fixed-income-carry-factor",
    "complexity": "Intermediate",
    "description": "A fixed income-focused implementation of the Carry factor strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Fixed"
    ],
    "page": 1
  },
  {
    "id": 97,
    "name": "Rolling down the yield curve",
    "category": "Fixed Income",
    "slug": "fixed-income-rolling-down-the-yield-curve",
    "complexity": "Intermediate",
    "description": "A fixed income-focused implementation of the Rolling down the yield curve strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Fixed"
    ],
    "page": 1
  },
  {
    "id": 98,
    "name": "Yield curve spread (flatteners & steepeners)",
    "category": "Fixed Income",
    "slug": "fixed-income-yield-curve-spread-flatteners-and-steepeners",
    "complexity": "Advanced",
    "description": "A fixed-income strategy that bets on changes in the yield-curve slope by taking offsetting long/short positions in bonds of different maturities.",
    "formulas": [
      "\\Delta Slope = y_{long} - y_{short}",
      "\\Pi = w_{short} \\Delta P_{short} + w_{long} \\Delta P_{long}",
      "DV01_{\\text{neutral}}: w_{short} DV01_{short} = w_{long} DV01_{long}"
    ],
    "tags": [
      "Fixed Income",
      "Rates",
      "Yield Curve"
    ],
    "page": 75
  },
  {
    "id": 99,
    "name": "CDS basis arbitrage",
    "category": "Fixed Income",
    "slug": "fixed-income-cds-basis-arbitrage",
    "complexity": "Intermediate",
    "description": "A fixed income-focused implementation of the CDS basis arbitrage strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Fixed"
    ],
    "page": 1
  },
  {
    "id": 100,
    "name": "Swap-spread arbitrage",
    "category": "Fixed Income",
    "slug": "fixed-income-swap-spread-arbitrage",
    "complexity": "Intermediate",
    "description": "A fixed income-focused implementation of the Swap-spread arbitrage strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Fixed"
    ],
    "page": 1
  },
  {
    "id": 101,
    "name": "Cash-and-carry arbitrage",
    "category": "Indexes",
    "slug": "indexes-cash-and-carry-arbitrage",
    "complexity": "Intermediate",
    "description": "A indexes-focused implementation of the Cash-and-carry arbitrage strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Indexes"
    ],
    "page": 1
  },
  {
    "id": 102,
    "name": "Dispersion trading in equity indexes",
    "category": "Indexes",
    "slug": "indexes-dispersion-trading-in-equity-indexes",
    "complexity": "Intermediate",
    "description": "A indexes-focused implementation of the Dispersion trading in equity indexes strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Indexes"
    ],
    "page": 1
  },
  {
    "id": 103,
    "name": "Dispersion trading \u2013 subset portfolio",
    "category": "Indexes",
    "slug": "indexes-dispersion-trading---subset-portfolio",
    "complexity": "Intermediate",
    "description": "A indexes-focused implementation of the Dispersion trading \u2013 subset portfolio strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Indexes"
    ],
    "page": 1
  },
  {
    "id": 104,
    "name": "Intraday arbitrage between index ETFs",
    "category": "Indexes",
    "slug": "indexes-intraday-arbitrage-between-index-etfs",
    "complexity": "Intermediate",
    "description": "A indexes-focused implementation of the Intraday arbitrage between index ETFs strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Indexes"
    ],
    "page": 1
  },
  {
    "id": 105,
    "name": "Index volatility targeting with risk-free asset",
    "category": "Indexes",
    "slug": "indexes-index-volatility-targeting-with-risk-free-asset",
    "complexity": "Intermediate",
    "description": "A risk-management overlay that dynamically allocates between a risky index and a risk-free asset to maintain a constant volatility target.",
    "formulas": [
      "w = \\min\\left(L, \\frac{\\sigma^*}{\\sigma}\\right)",
      "w_{rf} = 1 - w",
      "\\text{Rebalance if } \\frac{|\\Delta w|}{w} > \\kappa"
    ],
    "tags": [
      "Indexes",
      "Risk Management",
      "Volatility Targeting"
    ],
    "page": 80
  },
  {
    "id": 106,
    "name": "VIX futures basis trading",
    "category": "Volatility",
    "slug": "volatility-vix-futures-basis-trading",
    "complexity": "Advanced",
    "description": "A volatility mean-reversion strategy exploiting the VIX futures basis. When the futures curve is in contango (positive basis), short VIX futures; when in backwardation (negative basis), go long.",
    "formulas": [
      "B_{VIX} = P_{UX1} - P_{VIX}",
      "D = \\frac{B_{VIX}}{T}",
      "Rule = \\begin{cases} \\text{Long UX1} & D < -0.10 \\\\ \\text{Close long} & D > -0.05 \\\\ \\text{Short UX1} & D > 0.10 \\\\ \\text{Close short} & D < 0.05 \\end{cases}"
    ],
    "tags": [
      "Volatility",
      "VIX",
      "Mean-Reversion"
    ],
    "page": 81
  },
  {
    "id": 107,
    "name": "Volatility carry with two ETNs",
    "category": "Volatility",
    "slug": "volatility-volatility-carry-with-two-etns",
    "complexity": "Intermediate",
    "description": "A volatility-focused implementation of the Volatility carry with two ETNs strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Volatility"
    ],
    "page": 1
  },
  {
    "id": 108,
    "name": "Hedging short VXX with VIX futures",
    "category": "Volatility",
    "slug": "volatility-hedging-short-vxx-with-vix-futures",
    "complexity": "Intermediate",
    "description": "A volatility-focused implementation of the Hedging short VXX with VIX futures strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Volatility"
    ],
    "page": 1
  },
  {
    "id": 109,
    "name": "Volatility risk premium",
    "category": "Volatility",
    "slug": "volatility-volatility-risk-premium",
    "complexity": "Advanced",
    "description": "A volatility strategy that harvests the premium between implied and realized volatility by selling options or variance swaps and delta-hedging.",
    "formulas": [
      "VRP = \\sigma_{imp} - \\sigma_{realized}",
      "\\Pi \\approx \\frac{1}{2} \\Gamma S^2 (\\sigma_{imp}^2 - \\sigma_{realized}^2) \\Delta t"
    ],
    "tags": [
      "Volatility",
      "Risk Premium",
      "Options"
    ],
    "page": 83
  },
  {
    "id": 110,
    "name": "Volatility risk premium with Gamma hedging",
    "category": "Volatility",
    "slug": "volatility-volatility-risk-premium-with-gamma-hedging",
    "complexity": "Intermediate",
    "description": "A volatility-focused implementation of the Volatility risk premium with Gamma hedging strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Volatility"
    ],
    "page": 1
  },
  {
    "id": 111,
    "name": "Volatility skew \u2013 long risk reversal",
    "category": "Volatility",
    "slug": "volatility-volatility-skew---long-risk-reversal",
    "complexity": "Intermediate",
    "description": "A volatility-focused implementation of the Volatility skew \u2013 long risk reversal strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Volatility"
    ],
    "page": 1
  },
  {
    "id": 112,
    "name": "Volatility trading with variance swaps",
    "category": "Volatility",
    "slug": "volatility-volatility-trading-with-variance-swaps",
    "complexity": "Intermediate",
    "description": "A volatility-focused implementation of the Volatility trading with variance swaps strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Volatility"
    ],
    "page": 1
  },
  {
    "id": 113,
    "name": "Moving averages with HP filter",
    "category": "Foreign Exchange",
    "slug": "foreign-exchange-moving-averages-with-hp-filter",
    "complexity": "Intermediate",
    "description": "A foreign exchange-focused implementation of the Moving averages with HP filter strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Foreign"
    ],
    "page": 1
  },
  {
    "id": 114,
    "name": "Carry trade",
    "category": "Foreign Exchange",
    "slug": "foreign-exchange-carry-trade",
    "complexity": "Intermediate",
    "description": "A foreign-exchange strategy that borrows in a low-interest-rate currency and invests in a high-interest-rate currency, capturing the interest-rate differential.",
    "formulas": [
      "r_i = \\text{short-term interest rate in currency } i",
      "Carry_{ij} = r_i - r_j",
      "\\text{Return}_{ij} = \\Delta S_{ij} + Carry_{ij}"
    ],
    "tags": [
      "FX",
      "Carry",
      "Macro"
    ],
    "page": 86
  },
  {
    "id": 115,
    "name": "High-minus-low carry",
    "category": "Foreign Exchange",
    "slug": "foreign-exchange-high-minus-low-carry",
    "complexity": "Intermediate",
    "description": "A foreign exchange-focused implementation of the High-minus-low carry strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Foreign"
    ],
    "page": 1
  },
  {
    "id": 116,
    "name": "Dollar carry trade",
    "category": "Foreign Exchange",
    "slug": "foreign-exchange-dollar-carry-trade",
    "complexity": "Intermediate",
    "description": "A foreign exchange-focused implementation of the Dollar carry trade strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Foreign"
    ],
    "page": 1
  },
  {
    "id": 117,
    "name": "Momentum & carry combo",
    "category": "Foreign Exchange",
    "slug": "foreign-exchange-momentum-and-carry-combo",
    "complexity": "Advanced",
    "description": "Combines FX momentum and carry signals into a single multi-factor portfolio, typically via ranking and equal-weighting of signals.",
    "formulas": [
      "S_i^{mom} = \\text{rank}(R_i^{past})",
      "S_i^{carry} = \\text{rank}(r_i - r_{USD})",
      "S_i^{combo} = S_i^{mom} + S_i^{carry}"
    ],
    "tags": [
      "FX",
      "Momentum",
      "Carry",
      "Multi-Factor"
    ],
    "page": 88
  },
  {
    "id": 118,
    "name": "FX triangular arbitrage",
    "category": "Foreign Exchange",
    "slug": "foreign-exchange-fx-triangular-arbitrage",
    "complexity": "Intermediate",
    "description": "A foreign exchange-focused implementation of the FX triangular arbitrage strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Foreign"
    ],
    "page": 1
  },
  {
    "id": 119,
    "name": "Roll yields",
    "category": "Commodities",
    "slug": "commodities-roll-yields",
    "complexity": "Intermediate",
    "description": "A commodities-focused implementation of the Roll yields strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Commodities"
    ],
    "page": 1
  },
  {
    "id": 120,
    "name": "Trading based on hedging pressure",
    "category": "Commodities",
    "slug": "commodities-trading-based-on-hedging-pressure",
    "complexity": "Intermediate",
    "description": "A commodities-focused implementation of the Trading based on hedging pressure strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Commodities"
    ],
    "page": 1
  },
  {
    "id": 121,
    "name": "Portfolio diversification with commodities",
    "category": "Commodities",
    "slug": "commodities-portfolio-diversification-with-commodities",
    "complexity": "Intermediate",
    "description": "A commodities-focused implementation of the Portfolio diversification with commodities strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Commodities"
    ],
    "page": 1
  },
  {
    "id": 122,
    "name": "Value",
    "category": "Commodities",
    "slug": "commodities-value",
    "complexity": "Beginner",
    "description": "Value investing selects stocks with low prices relative to fundamentals such as book value, earnings, or cash flow. The strategy is predicated on mean-reversion in valuation ratios.",
    "formulas": [
      "BM_i = \\frac{Book Value_i}{Market Cap_i}",
      "PE_i = \\frac{Price_i}{Earnings_i}",
      "z_i = \\frac{BM_i - \\mu_{BM}}{\\sigma_{BM}}"
    ],
    "tags": [
      "Stocks",
      "Value",
      "Factor"
    ],
    "page": 42
  },
  {
    "id": 123,
    "name": "Skewness premium",
    "category": "Commodities",
    "slug": "commodities-skewness-premium",
    "complexity": "Intermediate",
    "description": "A commodities-focused implementation of the Skewness premium strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Commodities"
    ],
    "page": 1
  },
  {
    "id": 124,
    "name": "Trading with pricing models",
    "category": "Commodities",
    "slug": "commodities-trading-with-pricing-models",
    "complexity": "Intermediate",
    "description": "A commodities-focused implementation of the Trading with pricing models strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Commodities"
    ],
    "page": 1
  },
  {
    "id": 125,
    "name": "Hedging risk with futures",
    "category": "Futures",
    "slug": "futures-hedging-risk-with-futures",
    "complexity": "Intermediate",
    "description": "A futures-focused implementation of the Hedging risk with futures strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Futures"
    ],
    "page": 1
  },
  {
    "id": 126,
    "name": "Cross-hedging",
    "category": "Futures",
    "slug": "futures-cross-hedging",
    "complexity": "Intermediate",
    "description": "A futures-focused implementation of the Cross-hedging strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Futures"
    ],
    "page": 1
  },
  {
    "id": 127,
    "name": "Interest rate risk hedging",
    "category": "Futures",
    "slug": "futures-interest-rate-risk-hedging",
    "complexity": "Intermediate",
    "description": "A futures-focused implementation of the Interest rate risk hedging strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Futures"
    ],
    "page": 1
  },
  {
    "id": 128,
    "name": "Calendar spread",
    "category": "Futures",
    "slug": "futures-calendar-spread",
    "complexity": "Intermediate",
    "description": "A futures-focused implementation of the Calendar spread strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Futures"
    ],
    "page": 1
  },
  {
    "id": 129,
    "name": "Contrarian trading (mean-reversion)",
    "category": "Futures",
    "slug": "futures-contrarian-trading-mean-reversion",
    "complexity": "Intermediate",
    "description": "A futures-focused implementation of the Contrarian trading (mean-reversion) strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Futures"
    ],
    "page": 1
  },
  {
    "id": 130,
    "name": "Contrarian trading \u2013 market activity",
    "category": "Futures",
    "slug": "futures-contrarian-trading---market-activity",
    "complexity": "Intermediate",
    "description": "A futures-focused implementation of the Contrarian trading \u2013 market activity strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Futures"
    ],
    "page": 1
  },
  {
    "id": 131,
    "name": "Trend following (momentum)",
    "category": "Futures",
    "slug": "futures-trend-following-momentum",
    "complexity": "Intermediate",
    "description": "A futures strategy that buys assets with strong recent performance and sells those with weak recent performance, typically implemented across multiple asset classes.",
    "formulas": [
      "S_i(t) = \\text{sign}\\left(\\sum_{k=1}^{K} w_k R_i(t-k)\\right)",
      "w_i(t) = \\frac{S_i(t) \\sigma_{target}}{\\sigma_i(t)}",
      "\\Pi_t = \\sum_i w_i(t) R_i(t+1)"
    ],
    "tags": [
      "Futures",
      "Trend Following",
      "CTA"
    ],
    "page": 96
  },
  {
    "id": 132,
    "name": "Carry, equity tranche \u2013 index hedging",
    "category": "Structured Assets",
    "slug": "structured-assets-carry,-equity-tranche---index-hedging",
    "complexity": "Intermediate",
    "description": "A structured assets-focused implementation of the Carry, equity tranche \u2013 index hedging strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Structured"
    ],
    "page": 1
  },
  {
    "id": 133,
    "name": "Carry, senior/mezzanine \u2013 index hedging",
    "category": "Structured Assets",
    "slug": "structured-assets-carry,-senior-mezzanine---index-hedging",
    "complexity": "Intermediate",
    "description": "A structured assets-focused implementation of the Carry, senior/mezzanine \u2013 index hedging strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Structured"
    ],
    "page": 1
  },
  {
    "id": 134,
    "name": "Carry \u2013 tranche hedging",
    "category": "Structured Assets",
    "slug": "structured-assets-carry---tranche-hedging",
    "complexity": "Intermediate",
    "description": "A structured assets-focused implementation of the Carry \u2013 tranche hedging strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Structured"
    ],
    "page": 1
  },
  {
    "id": 135,
    "name": "Carry \u2013 CDS hedging",
    "category": "Structured Assets",
    "slug": "structured-assets-carry---cds-hedging",
    "complexity": "Intermediate",
    "description": "A structured assets-focused implementation of the Carry \u2013 CDS hedging strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Structured"
    ],
    "page": 1
  },
  {
    "id": 136,
    "name": "CDOs \u2013 curve trades",
    "category": "Structured Assets",
    "slug": "structured-assets-cdos---curve-trades",
    "complexity": "Intermediate",
    "description": "A structured assets-focused implementation of the CDOs \u2013 curve trades strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Structured"
    ],
    "page": 1
  },
  {
    "id": 137,
    "name": "Mortgage-backed security (MBS) trading",
    "category": "Structured Assets",
    "slug": "structured-assets-mortgage-backed-security-mbs-trading",
    "complexity": "Intermediate",
    "description": "A structured assets-focused implementation of the Mortgage-backed security (MBS) trading strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Structured"
    ],
    "page": 1
  },
  {
    "id": 138,
    "name": "Convertible arbitrage",
    "category": "Convertibles",
    "slug": "convertibles-convertible-arbitrage",
    "complexity": "Advanced",
    "description": "A relative-value strategy that buys undervalued convertible bonds and hedges the equity risk by shorting the underlying stock, capturing the embedded option cheapness.",
    "formulas": [
      "\\Delta = \\frac{\\partial CB}{\\partial S}",
      "\\Pi = CB - \\Delta S + \\text{financing}",
      "\\text{OAS} = \\text{yield spread over Treasury} - \\text{option cost}"
    ],
    "tags": [
      "Convertibles",
      "Relative Value",
      "Arbitrage"
    ],
    "page": 101
  },
  {
    "id": 139,
    "name": "Convertible option-adjusted spread",
    "category": "Convertibles",
    "slug": "convertibles-convertible-option-adjusted-spread",
    "complexity": "Intermediate",
    "description": "A convertibles-focused implementation of the Convertible option-adjusted spread strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Convertibles"
    ],
    "page": 1
  },
  {
    "id": 140,
    "name": "Municipal bond tax arbitrage",
    "category": "Tax Arbitrage",
    "slug": "tax-arbitrage-municipal-bond-tax-arbitrage",
    "complexity": "Intermediate",
    "description": "A tax arbitrage-focused implementation of the Municipal bond tax arbitrage strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Tax"
    ],
    "page": 1
  },
  {
    "id": 141,
    "name": "Cross-border tax arbitrage",
    "category": "Tax Arbitrage",
    "slug": "tax-arbitrage-cross-border-tax-arbitrage",
    "complexity": "Intermediate",
    "description": "A tax arbitrage-focused implementation of the Cross-border tax arbitrage strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Tax"
    ],
    "page": 1
  },
  {
    "id": 142,
    "name": "Cross-border tax arbitrage with options",
    "category": "Tax Arbitrage",
    "slug": "tax-arbitrage-cross-border-tax-arbitrage-with-options",
    "complexity": "Intermediate",
    "description": "A tax arbitrage-focused implementation of the Cross-border tax arbitrage with options strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Tax"
    ],
    "page": 1
  },
  {
    "id": 143,
    "name": "Inflation hedging \u2013 inflation swaps",
    "category": "Miscellaneous Assets",
    "slug": "miscellaneous-assets-inflation-hedging---inflation-swaps",
    "complexity": "Intermediate",
    "description": "A miscellaneous assets-focused implementation of the Inflation hedging \u2013 inflation swaps strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Miscellaneous"
    ],
    "page": 1
  },
  {
    "id": 144,
    "name": "TIPS-Treasury arbitrage",
    "category": "Miscellaneous Assets",
    "slug": "miscellaneous-assets-tips-treasury-arbitrage",
    "complexity": "Intermediate",
    "description": "A miscellaneous assets-focused implementation of the TIPS-Treasury arbitrage strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Miscellaneous"
    ],
    "page": 1
  },
  {
    "id": 145,
    "name": "Weather risk \u2013 demand hedging",
    "category": "Miscellaneous Assets",
    "slug": "miscellaneous-assets-weather-risk---demand-hedging",
    "complexity": "Intermediate",
    "description": "A miscellaneous assets-focused implementation of the Weather risk \u2013 demand hedging strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Miscellaneous"
    ],
    "page": 1
  },
  {
    "id": 146,
    "name": "Energy \u2013 spark spread",
    "category": "Miscellaneous Assets",
    "slug": "miscellaneous-assets-energy---spark-spread",
    "complexity": "Intermediate",
    "description": "A miscellaneous assets-focused implementation of the Energy \u2013 spark spread strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Miscellaneous"
    ],
    "page": 1
  },
  {
    "id": 147,
    "name": "Buying and holding distressed debt",
    "category": "Distressed Assets",
    "slug": "distressed-assets-buying-and-holding-distressed-debt",
    "complexity": "Intermediate",
    "description": "A distressed assets-focused implementation of the Buying and holding distressed debt strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Distressed"
    ],
    "page": 1
  },
  {
    "id": 148,
    "name": "Active distressed investing",
    "category": "Distressed Assets",
    "slug": "distressed-assets-active-distressed-investing",
    "complexity": "Intermediate",
    "description": "A distressed assets-focused implementation of the Active distressed investing strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Distressed"
    ],
    "page": 1
  },
  {
    "id": 149,
    "name": "Planning a reorganization",
    "category": "Distressed Assets",
    "slug": "distressed-assets-planning-a-reorganization",
    "complexity": "Intermediate",
    "description": "A distressed assets-focused implementation of the Planning a reorganization strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Distressed"
    ],
    "page": 1
  },
  {
    "id": 150,
    "name": "Buying outstanding debt",
    "category": "Distressed Assets",
    "slug": "distressed-assets-buying-outstanding-debt",
    "complexity": "Intermediate",
    "description": "A distressed assets-focused implementation of the Buying outstanding debt strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Distressed"
    ],
    "page": 1
  },
  {
    "id": 151,
    "name": "Loan-to-own",
    "category": "Distressed Assets",
    "slug": "distressed-assets-loan-to-own",
    "complexity": "Intermediate",
    "description": "A distressed assets-focused implementation of the Loan-to-own strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Distressed"
    ],
    "page": 1
  },
  {
    "id": 152,
    "name": "Distress risk puzzle",
    "category": "Distressed Assets",
    "slug": "distressed-assets-distress-risk-puzzle",
    "complexity": "Intermediate",
    "description": "A distressed assets-focused implementation of the Distress risk puzzle strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Distressed"
    ],
    "page": 1
  },
  {
    "id": 153,
    "name": "Distress risk puzzle \u2013 risk management",
    "category": "Distressed Assets",
    "slug": "distressed-assets-distress-risk-puzzle---risk-management",
    "complexity": "Intermediate",
    "description": "A distressed assets-focused implementation of the Distress risk puzzle \u2013 risk management strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Distressed"
    ],
    "page": 1
  },
  {
    "id": 154,
    "name": "Mixed-asset diversification with real estate",
    "category": "Real Estate",
    "slug": "real-estate-mixed-asset-diversification-with-real-estate",
    "complexity": "Intermediate",
    "description": "A real estate-focused implementation of the Mixed-asset diversification with real estate strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Real"
    ],
    "page": 1
  },
  {
    "id": 155,
    "name": "Intra-asset diversification within real estate",
    "category": "Real Estate",
    "slug": "real-estate-intra-asset-diversification-within-real-estate",
    "complexity": "Intermediate",
    "description": "A real estate-focused implementation of the Intra-asset diversification within real estate strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Real"
    ],
    "page": 1
  },
  {
    "id": 156,
    "name": "Property type diversification",
    "category": "Real Estate",
    "slug": "real-estate-property-type-diversification",
    "complexity": "Intermediate",
    "description": "A real estate-focused implementation of the Property type diversification strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Real"
    ],
    "page": 1
  },
  {
    "id": 157,
    "name": "Economic diversification",
    "category": "Real Estate",
    "slug": "real-estate-economic-diversification",
    "complexity": "Intermediate",
    "description": "A real estate-focused implementation of the Economic diversification strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Real"
    ],
    "page": 1
  },
  {
    "id": 158,
    "name": "Property type and geographic diversification",
    "category": "Real Estate",
    "slug": "real-estate-property-type-and-geographic-diversification",
    "complexity": "Intermediate",
    "description": "A real estate-focused implementation of the Property type and geographic diversification strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Real"
    ],
    "page": 1
  },
  {
    "id": 159,
    "name": "Real estate momentum \u2013 regional approach",
    "category": "Real Estate",
    "slug": "real-estate-real-estate-momentum---regional-approach",
    "complexity": "Intermediate",
    "description": "A real estate-focused implementation of the Real estate momentum \u2013 regional approach strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Real"
    ],
    "page": 1
  },
  {
    "id": 160,
    "name": "Inflation hedging with real estate",
    "category": "Real Estate",
    "slug": "real-estate-inflation-hedging-with-real-estate",
    "complexity": "Intermediate",
    "description": "A real estate-focused implementation of the Inflation hedging with real estate strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Real"
    ],
    "page": 1
  },
  {
    "id": 161,
    "name": "Fix-and-flip",
    "category": "Real Estate",
    "slug": "real-estate-fix-and-flip",
    "complexity": "Intermediate",
    "description": "A real estate-focused implementation of the Fix-and-flip strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Real"
    ],
    "page": 1
  },
  {
    "id": 162,
    "name": "Liquidity management",
    "category": "Cash",
    "slug": "cash-liquidity-management",
    "complexity": "Intermediate",
    "description": "A cash-focused implementation of the Liquidity management strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Cash"
    ],
    "page": 1
  },
  {
    "id": 163,
    "name": "Repurchase agreement (REPO)",
    "category": "Cash",
    "slug": "cash-repurchase-agreement-repo",
    "complexity": "Beginner",
    "description": "A cash-equivalent strategy where securities are sold with an agreement to repurchase them later at a slightly higher price, effectively earning short-term interest.",
    "formulas": [
      "P_{repurchase} = P_{sale} \\left(1 + r \\frac{T}{360}\\right)"
    ],
    "tags": [
      "Cash",
      "Fixed Income",
      "Money Market"
    ],
    "page": 115
  },
  {
    "id": 164,
    "name": "Pawnbroking",
    "category": "Cash",
    "slug": "cash-pawnbroking",
    "complexity": "Intermediate",
    "description": "A cash-focused implementation of the Pawnbroking strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Cash"
    ],
    "page": 1
  },
  {
    "id": 165,
    "name": "Loan sharking",
    "category": "Cash",
    "slug": "cash-loan-sharking",
    "complexity": "Intermediate",
    "description": "A cash-focused implementation of the Loan sharking strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Cash"
    ],
    "page": 1
  },
  {
    "id": 166,
    "name": "Artificial neural network (ANN)",
    "category": "Cryptocurrencies",
    "slug": "cryptocurrencies-artificial-neural-network-ann",
    "complexity": "Advanced",
    "description": "A cryptocurrency strategy using an artificial neural network to forecast short-term BTC price movements from technical indicators such as moving averages, moving standard deviations, and RSI.",
    "formulas": [
      "R(t) = \\frac{P(t)}{P(t+1)} - 1",
      "\\hat{R}(t) = f\\left(\\sum_j w_{ij}^{(L)} h_j^{(L-1)} + b_i^{(L)}\\right)",
      "L = \\frac{1}{N} \\sum_{t=1}^{N} \\left(\\hat{R}(t) - R(t)\\right)^2 + \\lambda \\sum w^2"
    ],
    "tags": [
      "Cryptocurrencies",
      "Machine Learning",
      "Neural Network"
    ],
    "page": 116
  },
  {
    "id": 167,
    "name": "Sentiment analysis \u2013 na\u00efve Bayes Bernoulli",
    "category": "Cryptocurrencies",
    "slug": "cryptocurrencies-sentiment-analysis---na\u00efve-bayes-bernoulli",
    "complexity": "Advanced",
    "description": "A crypto sentiment strategy that classifies tweet data to forecast BTC direction using a na\u00efve Bayes classifier with Bernoulli features.",
    "formulas": [
      "P(A|B) = \\frac{P(B|A)P(A)}{P(B)}",
      "P(C_\\alpha | X_1,\\ldots,X_N) = \\gamma P(C_\\alpha) \\prod_{i=1}^{N} P(X_i | C_\\alpha)",
      "C_{pred} = \\arg\\max_{C_\\alpha} P(C_\\alpha) \\prod_{i=1}^{N} \\prod_{a=1}^{M} [P(w_a|C_\\alpha)]^{X_{ia}} [1-P(w_a|C_\\alpha)]^{1-X_{ia}}"
    ],
    "tags": [
      "Cryptocurrencies",
      "Sentiment",
      "NLP",
      "Bayes"
    ],
    "page": 120
  },
  {
    "id": 168,
    "name": "Fundamental macro momentum",
    "category": "Global Macro",
    "slug": "global-macro-fundamental-macro-momentum",
    "complexity": "Intermediate",
    "description": "A global macro-focused implementation of the Fundamental macro momentum strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Global"
    ],
    "page": 1
  },
  {
    "id": 169,
    "name": "Global macro inflation hedge",
    "category": "Global Macro",
    "slug": "global-macro-global-macro-inflation-hedge",
    "complexity": "Intermediate",
    "description": "A global macro-focused implementation of the Global macro inflation hedge strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Global"
    ],
    "page": 1
  },
  {
    "id": 170,
    "name": "Global fixed-income strategy",
    "category": "Global Macro",
    "slug": "global-macro-global-fixed-income-strategy",
    "complexity": "Intermediate",
    "description": "A global macro-focused implementation of the Global fixed-income strategy strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Global"
    ],
    "page": 1
  },
  {
    "id": 171,
    "name": "Trading on economic announcements",
    "category": "Global Macro",
    "slug": "global-macro-trading-on-economic-announcements",
    "complexity": "Intermediate",
    "description": "A global macro-focused implementation of the Trading on economic announcements strategy, as described in Kakushadze & Serur (2018). The strategy is part of the pedagogical compendium of 151 trading strategies across asset classes.",
    "formulas": [],
    "tags": [
      "Global"
    ],
    "page": 1
  }
];