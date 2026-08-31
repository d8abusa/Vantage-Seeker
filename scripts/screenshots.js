import puppeteer from 'puppeteer'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const BASE_URL = 'http://localhost:5181'
const OUTPUT_DIR = path.join(__dirname, '..', '.github', 'assets')

const pages = [
  { path: '/', name: 'dashboard', wait: 2000 },
  { path: '/strategies', name: 'strategies', wait: 2000, fullPage: false },
  { path: '/strategies/stocks-price-momentum', name: 'strategy-detail', wait: 2000 },
  { path: '/wizard', name: 'wizard', wait: 2000 },
  { path: '/backtest', name: 'backtest', wait: 3000 },
  { path: '/analytics', name: 'analytics', wait: 2000 },
  { path: '/settings', name: 'settings', wait: 2000 },
]

async function main() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true })
  }

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900'],
  })

  const page = await browser.newPage()
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 })

  for (const { path: route, name, wait, fullPage = true } of pages) {
    const url = `${BASE_URL}${route}`
    console.log(`Capturing ${name}: ${url}`)
    await page.goto(url, { waitUntil: 'networkidle0' })
    await new Promise((resolve) => setTimeout(resolve, wait))

    const screenshotPath = path.join(OUTPUT_DIR, `${name}.png`)
    await page.screenshot({ path: screenshotPath, fullPage })
    console.log(`Saved ${screenshotPath}`)
  }

  await browser.close()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
