import axios from 'axios'
import express from 'express'

const app = express()
const port = 3000

app.get('/', async (req, res) => {
  if (req.query.quote === '' || req.query.base === '') {
    res.json({ error: 'Please give quote or base as query strings!' })
  }

  if (req.query.quote) {
    return res.json(await getQuote(req.query.quote))
  }

  if (req.query.base) {
    return res.json(await getQuote(req.query.base))
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

const markets = {
  fiat: [
    'AUD',
    'BIDR',
    'BRL',
    'BUSD',
    'BVND',
    'DAI',
    'EUR',
    'GBP',
    'IDRT',
    'NGN',
    'PAX',
    'RUB',
    'TRY',
    'TUSD',
    'UAH',
    'USDC',
    'USDT',
    'VAI',
  ],
  etf: ['BEAR', 'BULL', 'DOWN', 'UP'],
}

const getQuote = async (quoteCurrency = 'usdt', quoteVolume = 0) => {
  const quote = quoteCurrency.toUpperCase()

  const filter = [...markets.fiat, ...markets.etf].map((str) => str + quote)

  const res = await axios.get('https://api.binance.com/api/v3/ticker/24hr')

  const symbols = []

  res.data.forEach((obj) => {
    const objSymbol = obj.symbol
    const objVolume = parseInt(obj.quoteVolume, 10)

    if (objSymbol.endsWith(quote) && objVolume > quoteVolume) {
      let flag = 1

      filter.forEach((string) => {
        if (objSymbol.endsWith(string)) {
          flag = 0
        }
      })

      if (flag) {
        symbols.push({
          symbol: objSymbol,
          quoteVolume: objVolume,
        })
      }
    }
  })

  return symbols.sort((a, b) => b.quoteVolume - a.quoteVolume)
}

const getBase = async (baseCurrency = 'btc', baseVolume = 0) => {
  const base = baseCurrency.toUpperCase()

  const filter = [...markets.fiat].map((str) => base + str)

  const res = await axios.get('https://api.binance.com/api/v3/ticker/24hr')

  const symbols = []

  res.data.forEach((obj) => {
    const objSymbol = obj.symbol
    const objVolume = parseInt(obj.volume, 10)

    if (objSymbol.startsWith(base) && objVolume > baseVolume) {
      let flag = 0

      filter.forEach((string) => {
        if (objSymbol === string) {
          flag = 1
        }
      })

      if (flag) {
        symbols.push({
          symbol: objSymbol,
          baseVolume: objVolume,
        })
      }
    }
  })

  return symbols.sort((a, b) => b.baseVolume - a.baseVolume)
}
