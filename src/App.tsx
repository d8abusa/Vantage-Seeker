import { Layout } from '@/components/Layout'
import { Analytics } from '@/pages/Analytics'
import { Backtest } from '@/pages/Backtest'
import { Dashboard } from '@/pages/Dashboard'
import { Glossary } from '@/pages/Glossary'
import { Portfolio } from '@/pages/Portfolio'
import { Settings } from '@/pages/Settings'
import { Strategies } from '@/pages/Strategies'
import { StrategyDetail } from '@/pages/StrategyDetail'
import { Wizard } from '@/pages/Wizard'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/wizard" element={<Wizard />} />
          <Route path="/strategies" element={<Strategies />} />
          <Route path="/strategies/:slug" element={<StrategyDetail />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/backtest" element={<Backtest />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/glossary" element={<Glossary />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
