//const { networks } = require('../config')
const moment = require('moment')
const network = require('./network')

module.exports.getPoolDataUrl = Address => {
    if (Address) {
      return `https://farm.army/api/v0/farms/${Address}`
    }
  }
  
  module.exports.getAllProtocolsUrl = () => {
    return 'https://api.llama.fi/protocols'
  }
  
  module.exports.getAllChartsUrl = NetworkOrCoin => {
    if (NetworkOrCoin) {
      return `https://api.llama.fi/charts/${NetworkOrCoin}`
    }
    return `https://api.llama.fi/charts`
  }
  
  module.exports.getPoolTokensUrl = (Network, Address) => {
    if (Network && Address) {
      // NEW-- https://api.unmarshal.com/v1/bsc/address/0xb57f6f2f3a44d317852ddf4af7c446b247253ecc/assets?auth_key=rF46RJBaRtuwsvWqQh5n3zPQ5AyDpqp568EFo2R4
      return `https://api.unmarshal.com/v1/${Network}/address/${Address}/assets?auth_key=rF46RJBaRtuwsvWqQh5n3zPQ5AyDpqp568EFo2R4`
      // OLD -- return `https://stg-api.unmarshal.io/v1/${Network}/address/${Address}/assets?auth_key=VGVtcEtleQ%3D%3D`
    }
  }
  
  module.exports.getTotalDepositUrl = (Network, Address) => {
    if (Address && Network) {
      // OLD-- return `https://stg-api.unmarshal.io/v1/${Network}/address/${Address}/transactions`
      // NEW-- https://api.unmarshal.com/v2/bsc/address/0xb57f6f2f3a44d317852ddf4af7c446b247253ecc/transactions?page=1&auth_key=rF46RJBaRtuwsvWqQh5n3zPQ5AyDpqp568EFo2R4
      return `https://api.unmarshal.com/v2/${Network}/address/${Address}/transactions?page=1&auth_key=rF46RJBaRtuwsvWqQh5n3zPQ5AyDpqp568EFo2R4`
    }
  }
  
  module.exports.getVolumeUrl = (Network, Address) => {
    if (Network && Address) {
      return `https://api.coingecko.com/api/v3/coins/${Network}/contract/${Address}/market_chart/?vs_currency=usd&days=1`
    }
  }
  
  module.exports.getZrxPriceUrl = Network => {
    if (Network) {
      return `https://api.coingecko.com/api/v3/simple/token_price/${Network}?contract_addresses=0xe41d2489571d322189246dafa5ebde1f4699f498&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true`
    }
  }
  
  module.exports.getBitqueryUrl = () => {
    return `https://graphql.bitquery.io`
  }
  
  module.exports.getTokenTransactions = (Network, Address) => {
    if (Network && Address) {
      // OLD -- return `https://stg-api.unmarshal.io/v1/${Network}/address/${Address}/transactions?page=1&pageSize=1000&auth_key=VGVtcEtleQ%3D%3D`
      return `https://api.unmarshal.com/v2/${Network}/address/${Address}/transactions?page=1&pageSize=100&auth_key=rF46RJBaRtuwsvWqQh5n3zPQ5AyDpqp568EFo2R4`
    }
  }
  
  module.exports.getTokenTransactionsForChain = (Network, Address, q) => {
    if (Network && Address && q) {
      // NEW ONE - https://api.unmarshal.com/v2/bsc/address/0xb57f6f2f3a44d317852ddf4af7c446b247253ecc/transactions?page=1&auth_key=rF46RJBaRtuwsvWqQh5n3zPQ5AyDpqp568EFo2R4
      // return `https://stg-api.unmarshal.io/v1/${Network}/address/${Address}/transactions?${q}&auth_key=VGVtcEtleQ%3D%3D`
      return `https://api.unmarshal.com/v2/${Network}/address/${Address}/transactions?page=${q}&pageSize=50&auth_key=rF46RJBaRtuwsvWqQh5n3zPQ5AyDpqp568EFo2R4`
    }
  }
  
  module.exports.kingDefiMarketCap = () => {
    return 'https://api.kingdefi.io/api/v1/prices/?sorting=-market_cap&blockchain_id=1'
  }
  
  module.exports.getNftSalesUrl = () => {
    return `https://api.coinmarketcap.com/data-api/v3/nft/collections?start=0&limit=5`
  }
  module.exports.getMarketCapForDefi = network => {
    // return {
    //     "query": `{\n  ethereum(network: ${network}) {\n    dexTrades(options: {limit: 5, desc: \"tradeAmount\"}) {\n      tradeAmount(in: USD)\n      exchange {\n        fullName\n      }\n    }\n  }\n}\n`,
    //     "variables": "{}"
    // }
    const dateFrom = moment()
      .subtract(30, 'd')
      .format('YYYY-MM-DD')
    return {
      query: `{\n  ethereum(network: ${network}) {\n    dexTrades(options: {limit: 5, desc: \"tradeAmount\"}, date: {after: \"${dateFrom}\"}) {\n      tradeAmount(in: USD)\n      exchange {\n        fullName\n      }\n    }\n  }\n}\n`,
      variables: '{}'
    }
  }
  
  module.exports.defiPulseforTvl = () => {
    return `https://data-api.defipulse.com/api/v1/defipulse/api/GetProjects?api-key=cc17bc2cd663a4d8a763d7d2f8fd24d41e5fd74078e609811f4579f1b4fa`
  }
  
  module.exports.getFarmUrl = networks => {
    if (networks.toLowerCase() === 'Binance'.toLowerCase()) {
      // return `https://farm.army/api/v0/farms/${Address}`
      return `https://farm.army/api/v0/farms`
    } else {
      return `https://${networks.toLowerCase()}.farm.army/api/v0/farms`
      // return `https://${networks.toLowerCase()}.farm.army/api/v0/farms/${Address}`
    }
  }
  module.exports.getFarmUrlForPool = (networks, Address) => {
    if (networks.toLowerCase() === 'Binance'.toLowerCase()) {
      return `https://farm.army/api/v0/farms/${Address}`
    } else {
      return `https://${networks.toLowerCase()}.farm.army/api/v0/farms/${Address}`
    }
  }
  
  module.exports.getNftsUrl = (Network, Address) => {
    return `https://stg-api.unmarshal.io/v1/${Network}/address/${Address}/nft-assets?auth_key=VGVtcEtleQ==`
  }
  
  module.exports.totalTransactionCountQuery = network => {
    // return {
    //     "query": `{\n  ethereum(network: ${network}) {\n    dexTrades(options: {limit: 100, desc: \"date.date\"}) {\n      date{\n        date\n      }\n      transaction{\n        gasPrice,\n        gasValue,\n        gas\n      }\n      count\n      protocol\n    }\n  }\n}\n`,
    //     "variables": "{}"
    // }
    const dateFrom = moment()
      .subtract(20, 'd')
      .format('YYYY-MM-DD')
    // return {
    //     "query": `{\n  ethereum(network: ${network}) {\n    dexTrades(options: {limit: 1000,desc: \"count\"}\n    date: {since: \"${ateFrom}\", till:null}) {\n      date{\n        date\n      }\n      transaction{\n        gasPrice,\n        gasValue,\n        gas\n      }\n      count\n      protocol\n    }\n  }\n}\n`,
    //     "variables": "{}"
    // }
    return {
      query: `{\n  ethereum(network: ${network}) {\n    dexTrades(\n      date: {after: \"${dateFrom}\"}\n    ) {\n      protocol\n      totalGasUsed: gas(calculate:sum)\n      totalGasPrice :gasPrice(calculate:sum)\n      totalGasValue: gasValue(calculate:sum)\n      date: date {\n        date\n      }\n      count\n    }\n  }\n}`,
      variables: '{}'
    }
  }
  
  module.exports.coinmarketcapNFT = category => {
    if (category) {
      return `https://api.coinmarketcap.com/data-api/v3/nft/collections?start=0&limit=6&category=${category}`
    } else {
      return `https://api.coinmarketcap.com/data-api/v3/nft/collections?start=0&limit=6`
    }
  }
  
  module.exports.topMarketsUrl = () => {
    return 'https://nft-sales-service.dappradar.com/marketplace/day?currency=USD&sort=volume_fiat&order=desc&limit=10' // `https://nft-sales-service.dappradar.com/marketplace/day?currency=USD&sort=volume_fiat&order=desc`
  }
  
  // ONE INCH
  
  module.exports.oneInchTokens = ID => {
    return `https://api.1inch.exchange/v3.0/${ID}/tokens`
  }
  module.exports.oneInchQuote = (ID, queryString) => {
    //return `https://api.1inch.exchange/v3.0/137/quote?fromTokenAddress=0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE&toTokenAddress=0x111111111117dc0aa78b770fa6a738034120c302&amount=10000000000000000" `
    return `https://api.1inch.exchange/v3.0/${ID}/quote?${queryString}`
  }
  
  module.exports.candleSeriesUrl = (network, baseCurrency, quoteCurrency) => {
    return {
      query: `{\n  ethereum(network: ${network.toLowerCase()}) {\n    dexTrades(\n      any: [{baseCurrency: {is: \"${baseCurrency}\"}, quoteCurrency: {is: \"${quoteCurrency}\"}}]\n      date: {since: \"2021-09-01T18:05:00.000Z\"}\n      tradeAmountUsd: {gt: 1000}\n    ) {\n      timeInterval {\n        minute(format: \"%Y-%m-%d %H:%M:%S\", count: 30)\n      }\n      buyCurrency: baseCurrency {\n        symbol\n        address\n      }\n      buyAmount: baseAmount\n      buyAmountInUsd: baseAmount\n      sellCurrency: quoteCurrency {\n        symbol\n        address\n      }\n      sellAmountInUsd: quoteAmount\n      tradeAmount(in: USD)\n      volume: quoteAmount\n      trades: count\n      high: quotePrice(calculate: maximum)\n      low: quotePrice(calculate: minimum)\n      open: minimum(of: block, get: quote_price)\n      close: maximum(of: block, get: quote_price)\n    }\n  }\n}\n`,
      variables: '{}'
    }
  }
  
  module.exports.swapUrl = (ID, payload) => {
    // https://api.1inch.exchange/v3.0/1/swap?fromTokenAddress=0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee&toTokenAddress=0x6b175474e89094c44da98b954eedeac495271d0f&amount=100000000000000000000&fromAddress=0x52bc44d5378309ee2abf1539bf71de1b7d7be3b5&slippage=1;
    return `https://api.1inch.exchange/v3.0/${ID}/swap?${payload}`
  }
  
  module.exports.tokenPriceUrl = (network, Address) => {
    // return `https://api.coingecko.com/api/v3/simple/token_price/${network}?contract_addresses=${Address}&vs_currencies=usd`
    return `https://api.coingecko.com/api/v3/simple/token_price/${network}?contract_addresses=${Address}&vs_currencies=usd&include_market_cap=true&include_24hr_change=true&include_last_updated_at=true`
  }
  
  module.exports.PorfolioNftsUrl = (network, Address) => {
    return `https://deep-index.moralis.io/api/v2/${Address}/nft?chain=${network}&format=decimal&limit=10`
  }
  
  module.exports.NftTransactionsQuery = (network, Address) => {
    return {
      query: `{\n  ethereum(network: ${network} ) {\n    dexTrades(\n      options: {desc: [\"block.height\", \"tradeIndex\"], limit: 20}\n      baseCurrency: {is: \"${Address}\"}\n    ) {\n      transaction {\n        hash\n        to {\n          address\n          annotation\n        }\n        txFrom {\n          address\n          annotation\n        }\n      }\n      tradeIndex\n      baseCurrency(baseCurrency: {}) {\n        symbol\n        address\n        tokenId\n        name\n      }\n      tradeAmount(in: ETH)\n      sellAmount(in: USD)\n      buyAmount(in: USD)\n      date {\n        date(format: \"%Y-%m-%d %H:%M:%S\")\n      }\n      block {\n        height\n      }\n    }\n  }\n}\n`,
      variables: '{}'
    }
  }
  
  module.exports.NftCollectionsUrl = () => {
    return `https://collections.rarity.tools/static/collectionsMinimal.json`
  }
  
  
  
  module.exports.ChainTxCountUrl = network => {
    const dateFrom = moment()
      .subtract(360, 'd')
      .format('YYYY-MM-DD')
    return {
      query: `{\n  ethereum(network: ${network}) {\n    transactions(\n      options: {desc: \"date.date\"}\n      date: {since: \"${dateFrom}\", till: null}\n    ) {\n      date {\n        date\n      }\n      txCount: count\n      gasValue: gasValue(calculate: sum)\n    }\n  }\n}\n`,
      variables: '{}'
    }
    // {"query":"query MyQuery {\n  ethereum(network: ethereum) {\n    transactions(\n      options: {desc: \"date.date\"}\n      date: {since: \"2021-01-01\", till: null}\n    ) {\n      date {\n        date\n      }\n      txCount: count\n      gasValue: gasValue(calculate: sum)\n    }\n  }\n}\n","variables":"{}"}
  }
  
  module.exports.topNftSalesUrl = network => {
    let current_day = moment().format('YYYY-MM-DD')
    let week = moment()
      .subtract(6, 'd')
      .format('YYYY-MM-DD')
    // console.log(current_day, week)
    if (
      network.toLowerCase() === 'Ethereum'.toLowerCase() ||
      network.toLowerCase() === 'eth'.toLowerCase() ||
      network.toLowerCase() === 'ethereum'.toLowerCase()
    ) {
      // return `https://nonfungible.com/api/v4/market/history?filter=%5B%7B%22id%22%3A%22blockTimestamp%22%2C%22value%22%3A%5B%22${week}%22%2C%22${current_day}%22%5D%7D%5D&internal=true&length=5&sort=%5B%7B%22id%22%3A%22usdPrice%22%2C%22desc%22%3Atrue%7D%5D`;
      return 'https://api.nftrade.com/api/v1/tokens?limit=5&skip=0&chains[]=1&search=&order=&verified=true&sort=sold_desc'
    } else if (
      network.toLowerCase() === 'Binance'.toLowerCase() ||
      network.toLowerCase() === 'bsc'.toLowerCase()
    ) {
      return `https://api.nftrade.com/api/v1/tokens?limit=5&skip=0&chains[]=56&search=&order=&verified=true&sort=sold_desc`
    } else if (
      network.toLowerCase() === 'Polygon'.toLowerCase() ||
      network.toLowerCase() === 'matic'.toLowerCase()
    ) {
      return `https://api.nftrade.com/api/v1/tokens?limit=5&skip=0&chains[]=137&search=&order=&verified=true&sort=sold_desc`
    }
  }
  
  module.exports.nftFloorPrice = contractId => {
    return `https://api.nftrade.com/api/v1/trades/stats/?contractId=${contractId}`
  }
  
  module.exports.contractVerifyUrl = (network, Address) => {
    if (
      network.toLowerCase() == 'Binance'.toLowerCase() ||
      network.toLowerCase() === 'bsc'.toLowerCase()
    ) {
      return `https://api.bscscan.com/api?module=contract&action=getabi&address=${Address}&apikey=Q8DPUJCGJ7ETD29JDDKA2PYG91QPMBWWNB`
    } else if (
      network.toLowerCase() === 'Ethereum'.toLowerCase() ||
      network.toLowerCase() === 'eth'.toLowerCase() ||
      network.toLowerCase() === 'ethereum'.toLowerCase()
    ) {
      return `https://api.etherscan.io/api?module=contract&action=getabi&address=${Address}&apikey=DWSIIIH85NJMTX3ZTQB2ZPX3P5AVB1GV64`
    } else if (
      network.toLowerCase() === 'Polygon'.toLowerCase() ||
      network.toLowerCase() === 'matic'.toLowerCase()
    ) {
      return `https://api.polygonscan.com/api?module=contract&action=getabi&address=${Address}&apikey=RR3QKYKFPUG3C84QN1GQHCWY8P66ARURQY`
    }
  }
  
  module.exports.contractProxyCheck = (network, Address) => {
    if (
      network.toLowerCase() == 'Binance'.toLowerCase() ||
      network.toLowerCase() === 'bsc'.toLowerCase()
    ) {
      return `https://api.bscscan.com/api?module=contract&action=verifyproxycontract&apikey=Q8DPUJCGJ7ETD29JDDKA2PYG91QPMBWWNB&address=${Address}`
    } else if (
      network.toLowerCase() === 'Ethereum'.toLowerCase() ||
      network.toLowerCase() === 'eth'.toLowerCase() ||
      network.toLowerCase() === 'ethereum'.toLowerCase()
    ) {
      return `https://api.etherscan.io/api?module=contract&action=verifyproxycontract&apikey=DWSIIIH85NJMTX3ZTQB2ZPX3P5AVB1GV64&address=${Address}`
    } else if (
      network.toLowerCase() === 'Polygon'.toLowerCase() ||
      network.toLowerCase() === 'matic'.toLowerCase()
    ) {
      return `https://api.polygonscan.com/api?module=contract&action=verifyproxycontract&apikey=RR3QKYKFPUG3C84QN1GQHCWY8P66ARURQY&address=${Address}`
    }
  }
  
  module.exports.contractProxyUrl = (network, guide) => {
    if (
      network.toLowerCase() == 'Binance'.toLowerCase() ||
      network.toLowerCase() === 'bsc'.toLowerCase()
    ) {
      return `https://api.bscscan.com/api?module=contract&action=checkproxyverification&guid=${guide}&apikey=Q8DPUJCGJ7ETD29JDDKA2PYG91QPMBWWNB`
    } else if (
      network.toLowerCase() === 'Ethereum'.toLowerCase() ||
      network.toLowerCase() === 'eth'.toLowerCase() ||
      network.toLowerCase() === 'ethereum'.toLowerCase()
    ) {
      return `https://api.etherscan.io/api?module=contract&action=checkproxyverification&guid=${guide}&apikey=DWSIIIH85NJMTX3ZTQB2ZPX3P5AVB1GV64`
    } else if (
      network.toLowerCase() === 'Polygon'.toLowerCase() ||
      network.toLowerCase() === 'matic'.toLowerCase()
    ) {
      return `https://api.polygonscan.com/api?module=contract&action=checkproxyverification&guid=${guide}&apikey=RR3QKYKFPUG3C84QN1GQHCWY8P66ARURQY`
    }
  }
  
  module.exports.searchTokenAddress = network => {
    if (
      network.toLowerCase() === 'Ethereum'.toLowerCase() ||
      network.toLowerCase() === 'eth'.toLowerCase() ||
      network.toLowerCase() === 'ethereum'.toLowerCase()
    ) {
      return 'https://tokens.coingecko.com/uniswap/all.json'
    }
    if (
      network.toLowerCase() === 'bsc'.toLowerCase() ||
      network.toLowerCase() === 'binance-smart-chain'.toLowerCase() ||
      network.toLowerCase() === 'Binance'.toLowerCase()
    ) {
      return 'https://tokens.pancakeswap.finance/pancakeswap-extended.json'
    }
    if (
      network.toLowerCase() === 'Polygon'.toLowerCase() ||
      network.toLowerCase() === 'matic'.toLowerCase()
    ) {
      return 'https://unpkg.com/quickswap-default-token-list@1.1.8/build/quickswap-default.tokenlist.json'
    }
    return ''
    // return {
    //     "query": `{\n  ethereum(network: ${network}) {\n    transfers(currency: {in: \"${name}\"}) {    \n      currency {\n        address\n        decimals\n        name\n        symbol\n        tokenType\n      }\n    }\n  }\n}\n`,
    //     "variables": "{}"
    // }
  }
  module.exports.getPairsListBasedOnBaseCurrency = (network, baseCurrency) => {
    return {
      query: `{\n  ethereum(network: ${network}) {\n    dexTrades(\n       options: {limit: 1000,desc:\"volume\"}\n      baseCurrency: {is: \"${baseCurrency}\"}\n    ) {\n      exchange {\n        fullName\n      }\n      count\n      volume: quoteAmount\n      buyAmountInUsd: baseAmount\n      sellAmountInUsd: quoteAmount\n      tradeAmount(in: USD)\n      high: quotePrice(calculate: maximum)\n      low: quotePrice(calculate: minimum)\n      open: minimum(of: block, get: quote_price)\n      close: maximum(of: block, get: quote_price)\n       baseCurrency {\n        address\n        name\n        symbol\n      }\n      quoteCurrency {\n        name\n        address\n        symbol\n      }\n    }\n  }\n}\n`,
      variables: '{}'
    }
  }
  
  
  module.exports.getPairsListBasedOnQuoteCurrency = (network, quoteCurrency) => {
    return {
      query: `{\n  ethereum(network: ${network}) {\n    dexTrades(\n       options: {limit: 1000,desc:\"volume\"}\n     quoteCurrency: {is: \"${quoteCurrency}\"}\n    ) {\n      exchange {\n        fullName\n      }\n     count\n      volume: quoteAmount\n      buyAmountInUsd: baseAmount\n      sellAmountInUsd: quoteAmount\n      tradeAmount(in: USD)\n      high: quotePrice(calculate: maximum)\n      low: quotePrice(calculate: minimum)\n      open: minimum(of: block, get: quote_price)\n      close: maximum(of: block, get: quote_price)\n        baseCurrency {\n        address\n        name\n        symbol\n      }\n      quoteCurrency {\n        name\n        address\n        symbol\n      }\n    }\n  }\n}\n`,
      variables: '{}'
    }
  }
  
  module.exports.getOHLC = (network, baseAddress, quoteAddress, interval) => {
    const dateFrom = moment()
      .subtract(300, 'd')
      .format('YYYY-MM-DD')
    return {
      query: `query ($baseAddress: String!, $quoteAddress: String!, $from: ISO8601DateTime!, $interval: Int) {\n  ethereum(network: ${network}) {\n    dexTrades(\n      any: [{baseCurrency: {is: $baseAddress}, quoteCurrency: {is: $quoteAddress}}]\n      date: {since: $from}\n      tradeAmountUsd: {gt: 10}\n    ) {\n      timeInterval {\n        minute(format: \"%FT%TZ\", count: $interval)\n      }\n      buyCurrency: baseCurrency {\n        symbol\n        address\n      }\n      buyAmount: baseAmount\n      buyAmountInUsd: baseAmount\n      sellCurrency: quoteCurrency {\n        symbol\n        address\n      }\n      sellAmountInUsd: quoteAmount\n      tradeAmount(in: USD)\n      volume: quoteAmount\n      trades: count\n      high: quotePrice(calculate: maximum)\n      low: quotePrice(calculate: minimum)\n      open: minimum(of: block, get: quote_price)\n      close: maximum(of: block, get: quote_price)\n    }\n  }\n}\n`,
      variables: `{\n  \"from\": \"${dateFrom}\",\n  \"interval\": ${interval},\n  \"baseAddress\": \"${baseAddress}\",\n  \"quoteAddress\": \"${quoteAddress}\",\n  \"minAmount\": 1000\n}`
    }
  }
  
  module.exports.getPairsDetails = (network, baseAddress, quoteAddress) => {
    return {
      query: `{\n  ethereum(network: ${network}) {\n    dexTrades(\n      options: {limit: 1, desc: \"volume\"}\n      baseCurrency:{is:\"${baseAddress}\"}\n      quoteCurrency: {is: \"${quoteAddress}\"}\n    ) {\n      exchange {\n        fullName\n      }\n      count\n      volume: quoteAmount\n      buyAmountInUsd: baseAmount\n      sellAmountInUsd: quoteAmount\n      tradeAmount(in: USD)\n      high: quotePrice(calculate: maximum)\n      low: quotePrice(calculate: minimum)\n      open: minimum(of: block, get: quote_price)\n      close: maximum(of: block, get: quote_price)\n      baseCurrency {\n        address\n        name\n        symbol\n      }\n      quoteCurrency {\n        name\n        address\n        symbol\n      }\n    }\n  }\n}\n`,
      variables: '{}'
    }
  }
  module.exports.getTransactionsBaseAndQuote = (
    network,
    baseAddress,
    quoteAddress
  ) => {
    const dateFrom = moment()
      .subtract(30, 'd')
      .format('YYYY-MM-DD')
    return {
      query: `query ($network: EthereumNetwork!, $limit: Int!, $offset: Int!, $from: ISO8601DateTime, $till: ISO8601DateTime) {\n  ethereum(network: $network) {\n    dexTrades(\n        baseCurrency: {is: \"${baseAddress}\"}\n      quoteCurrency: {is: \"${quoteAddress}\"}\n      options: {desc: [\"block.height\", \"tradeIndex\"], limit: $limit, offset: $offset}\n      date: {since: $from, till: $till}\n    ) {\n      block {\n        timestamp {\n          time(format: \"%Y-%m-%d %H:%M:%S\")\n        }\n        height\n      }\n      tradeIndex\n      protocol\n      exchange {\n        fullName\n      }\n      smartContract {\n        address {\n          address\n          annotation\n        }\n      }\n      buyAmount\n      buyCurrency {\n    decimals\n    address\n        symbol\n      }\n      sellAmount\n      sellCurrency {\n   decimals\n     address\n        symbol\n      }\n      transaction {\n        hash\n   gasValue\n        to {\n          address\n        }\n     }\n    }\n  }\n}\n`,
      variables: `{\n  \"limit\": 100,\n  \"offset\": 0,\n  \"network\": \"${network}\",\n  \"from\": \"${dateFrom}\",\n  \"till\": null,\n  \"dateFormat\": \"%Y-%m-%d\"\n}`
    }
  }
  
  // Rug contract Address- Price, Marketcap
  module.exports.getRugTokenPrice = (network, Address) => {
    console.log(network, Address)
    return `https://api.coingecko.com/api/v3/simple/token_price/${network}?contract_addresses=${Address}&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true`
  }
  
  // Rug - Total Supply
  module.exports.getRugTokenTotalSupply = (network, Address) => {
    if (
      network.toLowerCase() == 'Binance'.toLowerCase() ||
      network.toLowerCase() === 'bsc'.toLowerCase()
    ) {
      return `https://api.bscscan.com/api?module=stats&action=tokensupply&contractaddress=${Address}&apikey=Q8DPUJCGJ7ETD29JDDKA2PYG91QPMBWWNB`
    } else if (
      network.toLowerCase() === 'Ethereum'.toLowerCase() ||
      network.toLowerCase() === 'eth'.toLowerCase()
    ) {
      return `https://api.etherscan.io/api?module=stats&action=tokensupply&contractaddress=${Address}&apikey=DWSIIIH85NJMTX3ZTQB2ZPX3P5AVB1GV64`
    } else if (
      network.toLowerCase() === 'Polygon'.toLowerCase() ||
      network.toLowerCase() === 'matic'.toLowerCase()
    ) {
      return `https://api.polygonscan.com/api?module=stats&action=tokensupply&contractaddress=${Address}&apikey=RR3QKYKFPUG3C84QN1GQHCWY8P66ARURQY`
    }
  }
  
  // Rug - Token Trades
  module.exports.getTokenTradesUrl = (network, Address) => {
    return {
      query: `{\n  ethereum(network: ${network}) {\n    dexTrades(\n      baseCurrency: {is: \"${Address}\"}\n      options: {desc: \"timeInterval.minute\", limit: 20}\n    ) {\n      date {\n        date(format: \"%Y-%m-%d\")\n      }\n      timeInterval {\n        minute(format: \"%Y-%m-%dT%H:%M:%SZ\")\n      }\n      SellPriceInUsd: sellAmount(in: USD)\n      BuyPriceInUsd: buyAmount(in: USD)\n      SellPriceInETH: sellAmount(in: ETH)\n      BuyPriceInETH: buyAmount(in: ETH)\n      side\n      tradeAmount(in: USD)\n      transaction {\n        to {\n          address\n        }\n        txFrom {\n          address\n        }\n        hash\n      }\n      \n    }\n  }\n}\n`,
      variables: '{}'
    }
  }
  
  // Rug - Token info-bal,txCount,txAmount
  module.exports.getTokenInfoUrl = (network, Address) => {
    return {
      query: `{\n  ethereum(network: ${network}) {\n    address(address: {is: \"${Address}\"}) {\n      balance\n      annotation\n      address\n    }\n    transactions(txTo: {is: \"${Address}\"}) {\n      TxCount: count(success: true)\n      TxAmountInUSD: amount(calculate: sum, in: USD)\n    }\n    transfers(any: {currency: {is: \"${Address}\"}}) {\n      count(uniq: transfers)\n    }\n  }\n}\n`,
      variables: '{}'
    }
  }
  
  // Rug - Burned Tokens
  module.exports.getBurnedTokensUrl = (network, Address) => {
    if (network.toLowerCase() === 'bsc') {
      return {
        query: `{\n  ethereum(network: ${network}) {\n    transfers(currency: {is: \"${Address}\"}) {\n      burned: amount(\n        calculate: sum\n        receiver: {is: \"0x000000000000000000000000000000000000dead\"}\n      )\n    }\n  }\n}\n`,
        variables: '{}'
      }
    } else {
      return {
        query: `{\n  ethereum(network: ${network}) {\n    transfers(currency: {is: \"${Address}\"}) {\n      burned: amount(\n        calculate: sum\n        receiver: {is: \"0x0000000000000000000000000000000000000000\"}\n      )\n    }\n  }\n}\n`,
        variables: '{}'
      }
    }
  }
  
  // Portfolio - User NFT from tin.network
  module.exports.userNftsUrl = (networkId, Address) => {
    return `https://openapi.tin.network/v1/users/nfts/${Address}?chainId=${networkId}`
  }
  
  // Nft Market - Trending NFTs
  module.exports.getTrendingNftsUrl = () => {
    return `https://api.opensea.io/api/v1/assets?order_by=sale_date&order_by=sale_count&order_direction=desc&offset=0&limit=6`
  }
  
  // User NFT's - Portfolio
  module.exports.UserHoldedNftsUrl = (Address, Scroll = null, limit = 8) => {
    var url = `https://api.opensea.io/api/v1/assets?limit=${limit}&format=json&order_by=sale_date&order_direction=desc&owner=${Address}`
    if (Scroll) {
      url += `&cursor=${Scroll}`;
    }
    return url;
  }
  
  // NFTs of a Collection - NFTRanking
  module.exports.getCollectionNftsUrl = (page, collection) => {
    // https://api.opensea.io/api/v1/assets?order_by=sale_date&collection=meebits&format=json&limit=50&offset=0&order_direction=desc
    return `https://api.opensea.io/api/v1/assets?order_by=sale_count&collection=${collection}&format=json&limit=48&offset=${page}&order_direction=desc`
  }
  
  module.exports.EthUsdPriceUrl = () => {
    return `https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2&vs_currencies=usd`
  }
  
  module.exports.getTokenPair = (network, Address) => {
    return {
      query: `{\n  ethereum(network: ${network}) {\n    dexTrades(\n      baseCurrency: {is: \"${Address}\"}\n      options: {desc: \"trades\", limit: 100}\n    ) {\n      pairAddress: smartContract {\n        address {\n          address\n        }\n      }\n      exchange {\n        fullName\n        address {\n          address\n        }\n      }\n      tokenA: baseCurrency {\n        symbol\n        address\n      }\n      tokenB: quoteCurrency {\n        symbol\n        address\n      }\n      trades: count\n    }\n  }\n}\n`,
      variables: '{}'
    }
  }
  
  module.exports.getLiquidityUrl = (pairAddress, network) => {
    // console.log(pairAddress, network)
    if (network.toLowerCase() === 'bsc' || network === 'Binance') {
      return `https://deep-index.moralis.io/api/v2/${pairAddress}/reserves?chain=bsc`
    } else if (network.toLowerCase() === 'eth' || network === 'Ethereum') {
      return `https://deep-index.moralis.io/api/v2/${pairAddress}/reserves?chain=eth`
    } else if (network === 'Polygon' || network.toLowerCase() === 'matic') {
      return `https://deep-index.moralis.io/api/v2/${pairAddress}/reserves?chain=polygon`
    }
  }
  
  module.exports.getPoolsWithYield = Address => {
    // https://www.yieldwatch.net/api/all/0xb57f6f2f3a44d317852ddf4af7c446b247253ecc?platforms=biswap,alpha,apeswap,hyperJump,beefy,belt,blizzard,bunnypark,fortress,mdex,pancake,jetfuel,auto,acryptos,bunny,cream,qubit,venus,wault,moonpot,hyper
    return `https://www.yieldwatch.net/api/all/${Address}?platforms=biswap,alpha,auto,apeswap,hyperJump,beefy,belt,blizzard,bunnypark,fortress,mdex,pancake,jetfuel,acryptos,bunny,cream,qubit,venus,wault,moonpot,hyper`
  }
  
  module.exports.getUpdatedCollectionsUrl = () => {
    return `https://collections.rarity.tools/collectionsStats`
  }
  
  // module.exports.getTrendingCollectionsForGivenPeriod = (page) => {
  //   return `https://api.opensea.io/api/v1/assets?format=json&limit=50&offset=${page}&order_by=sale_date&order_direction=desc`
  // }
  
  module.exports.trendingCollectionsUrl = () => {
    return `https://api.icy.tools/graphql`
  }
  
  module.exports.trendingCollectionsQuery = period => {
    if (period) {
      return {
        operationName: `TrendingCollections`,
        variables: { filter: { period: `${period}` } },
        query: `query TrendingCollections($filter: TrendingCollectionsFilterInput) {\n  trendingCollections(filter: $filter) {\n    ...TrendingCollection\n    __typename\n  }\n}\n\nfragment TrendingCollection on TrendingCollection {\n  averagePriceInEth\n  count\n  maxPriceInEth\n  minPriceInEth\n  volumeInEth\n  address\n  description\n  discordUrl\n  externalUrl\n  imageUrl\n  instagramUsername\n  name\n  slug\n  symbol\n  telegramUrl\n  twitterUsername\n  uuid\n  dailyVolumes\n  deltaStats {\n    averagePriceInEth\n    count\n    maxPriceInEth\n    minPriceInEth\n    volumeInEth\n    __typename\n  }\n  __typename\n}\n`
      }
    } else {
      return {
        operationName: `TrendingCollections`,
        variables: { filter: { period: `ONE_HOUR` } },
        query: `query TrendingCollections($filter: TrendingCollectionsFilterInput) {\n  trendingCollections(filter: $filter) {\n    ...TrendingCollection\n    __typename\n  }\n}\n\nfragment TrendingCollection on TrendingCollection {\n  averagePriceInEth\n  count\n  maxPriceInEth\n  minPriceInEth\n  volumeInEth\n  address\n  description\n  discordUrl\n  externalUrl\n  imageUrl\n  instagramUsername\n  name\n  slug\n  symbol\n  telegramUrl\n  twitterUsername\n  uuid\n  dailyVolumes\n  deltaStats {\n    averagePriceInEth\n    count\n    maxPriceInEth\n    minPriceInEth\n    volumeInEth\n    __typename\n  }\n  __typename\n}\n`
      }
    }
  }
  
  module.exports.topMintsQuery = period => {
    if (period) {
      return {
        operationName: 'TrendingMints',
        variables: { filter: { period: `${period}` } },
        query: `query TrendingMints($filter: TrendingMintsFilterInput) {\n  trendingMints(filter: $filter) {\n    ...TrendingMint\n    __typename\n  }\n}\n\nfragment TrendingMint on TrendingMint {\n  count\n  distinct\n  index\n  sum\n  distinctSum\n  address\n  description\n  discordUrl\n  externalUrl\n  imageUrl\n  instagramUsername\n  name\n  slug\n  symbol\n  telegramUrl\n  twitterUsername\n  uuid\n  deltaStats {\n    count\n    index\n    __typename\n  }\n  __typename\n}\n`
      }
    } else {
      return {
        operationName: 'TrendingMints',
        variables: { filter: { period: `ONE_HOUR` } },
        query: `query TrendingMints($filter: TrendingMintsFilterInput) {\n  trendingMints(filter: $filter) {\n    ...TrendingMint\n    __typename\n  }\n}\n\nfragment TrendingMint on TrendingMint {\n  count\n  distinct\n  index\n  sum\n  distinctSum\n  address\n  description\n  discordUrl\n  externalUrl\n  imageUrl\n  instagramUsername\n  name\n  slug\n  symbol\n  telegramUrl\n  twitterUsername\n  uuid\n  deltaStats {\n    count\n    index\n    __typename\n  }\n  __typename\n}\n`
      }
    }
  }
  
  module.exports.topBuyersUrl = period => {
    if (period) {
      return `https://api.icy.tools/_legacy/orders/top-buyers?period=${period}`
    } else {
      return `https://api.icy.tools/_legacy/orders/top-buyers?period=1h`
    }
  }
  
  module.exports.topSellersUrl = period => {
    if (period) {
      return `https://api.icy.tools/_legacy/orders/top-sellers?period=${period}`
    } else {
      return `https://api.icy.tools/_legacy/orders/top-sellers?period=1h`
    }
  }
  
  module.exports.upcomingNftsUrl = () => {
    return `https://collections.rarity.tools/upcoming2`
  }
  
  module.exports.watchAddressQuery = Address => {
    if (Address === '') {
      return {
        operationName: 'Collection',
        variables: { address: `0x30917a657ae7d1132bdca40187d781fa3b60002f` },
        query: `query Collection($address: String!) {\n  collection(address: $address) {\n    address\n    createdAt\n    description\n    discordUrl\n    externalUrl\n    imageUrl\n    instagramUsername\n    name\n    slug\n    symbol\n    telegramUrl\n    twitterUsername\n    uuid\n    dailyStats {\n      averagePriceInEth\n      maxPriceInEth\n      minPriceInEth\n      numberOfMints\n      numberOfOrders\n      recentFloorPriceInEth\n      volumeInEth\n      topBuyers {\n        amountInEth\n        count\n        wallet {\n          address\n          ensName\n          __typename\n        }\n        __typename\n      }\n      topSellers {\n        amountInEth\n        count\n        wallet {\n          address\n          ensName\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}\n`
      }
    } else {
      return {
        operationName: 'Collection',
        variables: { address: `${Address}` },
        query: `query Collection($address: String!) {\n  collection(address: $address) {\n    address\n    createdAt\n    description\n    discordUrl\n    externalUrl\n    imageUrl\n    instagramUsername\n    name\n    slug\n    symbol\n    telegramUrl\n    twitterUsername\n    uuid\n    dailyStats {\n      averagePriceInEth\n      maxPriceInEth\n      minPriceInEth\n      numberOfMints\n      numberOfOrders\n      recentFloorPriceInEth\n      volumeInEth\n      topBuyers {\n        amountInEth\n        count\n        wallet {\n          address\n          ensName\n          __typename\n        }\n        __typename\n      }\n      topSellers {\n        amountInEth\n        count\n        wallet {\n          address\n          ensName\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}\n`
      }
    }
  }
  
  // opensea
  module.exports.collectionInfoUrl = slug => {
    return `https://api.opensea.io/api/v1/collection/${slug}?format=json`
  }
  
  module.exports.pairsForTokenQuery = (network, address) => {
    return {
      query: `{\n  ethereum(network: ${network}) {\n    dexTrades(\n      baseCurrency: {is: \"${address}\"}\n      options: {desc: \"trades\", limit: 100}\n    ) {\n      pairAddress: smartContract {\n        address {\n          address\n        }\n      }\n      exchange {\n        fullName\n        address {\n          address\n        }\n      }\n      tokenA: baseCurrency {\n        symbol\n        address\n      }\n      tokenB: quoteCurrency {\n        symbol\n        address\n      }\n      trades: count\n    }\n  }\n}\n`,
      variables: '{}'
    }
  }
  
  module.exports.moralisDexTradesUrl = network => {
    console.log(network)
    if (
      network.toLocaleLowerCase() === 'Binance'.toLocaleLowerCase() ||
      'BSC'.toLocaleLowerCase()
    ) {
      return `https://uihqoggdn8rm.usemoralis.com:2053/server/classes/bsctrades`
    } else if (
      network.toLocaleLowerCase() === 'Ethereum'.toLocaleLowerCase() ||
      'ETH'.toLocaleLowerCase()
    ) {
      return `https://uihqoggdn8rm.usemoralis.com:2053/server/classes/ethtrades`
    } else if (
      network.toLocaleLowerCase() === 'Polygon'.toLocaleLowerCase() ||
      'MATIC'.toLocaleLowerCase()
    ) {
      return `https://uihqoggdn8rm.usemoralis.com:2053/server/classes/polytrades`
    }
  }
  
  module.exports.moralisDexTradesPayload = () => {
    return {
      where: {},
      limit: 200,
      order: '-createdAt',
      _method: 'GET',
      _ApplicationId: 'Xt0XLkeNaL3660LcKntEwxjNyzqwpYj2gytNcVLX',
      _ClientVersion: 'js2.12.0',
      _MasterKey: '0EuUYphqKMAIzlHGb1oj0Yyyq3sQT6y0ap2UwpGA',
      _InstallationId: '26edade4-2b30-43d1-8a62-ecfcd8fedfcc'
    }
  }
  
  module.exports.getTokenChartTradesQuery = (network, address) => {
    return {
      query: `{\n  ethereum(network: ${network}) {\n    dexTrades(\n      options: {limit: 20, desc: \"timeInterval.second\"}\n      baseCurrency: {is: \"${address}\"}\n    ) {\n      transaction {\n        hash\n      }\n      buyAmount(in: ETH)\n      buyAmountInUsd: buyAmount(in: USD)\n      buyCurrency {\n        symbol\n      }\n      sellAmount(in: ETH)\n      sellCurrency {\n        symbol\n      }\n      sellAmountInUsd: sellAmount(in: USD)\n      tradeAmount(in: USD)\n      timeInterval {\n        second(format: \"%Y-%m-%dT%H:%M:%SZ\")\n      }\n      side\n    }\n  }\n}\n`,
      variables: '{}'
    }
  }
  
  module.exports.getBlock = network => {
    const day = moment().unix()
    // console.log(day)
    if (
      network.toLocaleLowerCase() === 'Ethereum'.toLocaleLowerCase() ||
      network.toLocaleLowerCase() === 'ETH'.toLocaleLowerCase()
    ) {
      return `https://deep-index.moralis.io/api/v2/dateToBlock?chain=eth&date=${day}`
    } else if (
      network.toLocaleLowerCase() === 'Binance'.toLocaleLowerCase() ||
      network.toLocaleLowerCase() === 'BSC'.toLocaleLowerCase()
    ) {
      return `https://deep-index.moralis.io/api/v2/dateToBlock?chain=bsc&date=${day}`
    } else if (
      network.toLocaleLowerCase() === 'Polygon'.toLocaleLowerCase() ||
      network.toLocaleLowerCase() === 'MATIC'.toLocaleLowerCase()
    ) {
      return `https://deep-index.moralis.io/api/v2/dateToBlock?chain=polygon&date=${day}`
    }
  }
  
  module.exports.getLogs = (pairAddress, network, toTime, fromTime) => {
    if (
      network.toLocaleLowerCase() === 'Ethereum'.toLocaleLowerCase() ||
      network.toLocaleLowerCase() === 'ETH'.toLocaleLowerCase()
    ) {
      return `https://deep-index.moralis.io/api/v2/${pairAddress}/logs?chain=eth&to_date=${toTime}&from_date=${fromTime}&topic0=0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822`
    } else if (
      network.toLocaleLowerCase() === 'Binance'.toLocaleLowerCase() ||
      network.toLocaleLowerCase() === 'BSC'.toLocaleLowerCase()
    ) {
      return `https://deep-index.moralis.io/api/v2/${pairAddress}/logs?chain=bsc&to_date=${toTime}&from_date=${fromTime}&topic0=0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822`
    } else if (
      network.toLocaleLowerCase() === 'Polygon'.toLocaleLowerCase() ||
      network.toLocaleLowerCase() === 'MATIC'.toLocaleLowerCase()
    ) {
      return `https://deep-index.moralis.io/api/v2/${pairAddress}/logs?chain=polygon&to_date=${toTime}&from_date=${fromTime}&topic0=0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822`
    }
  }
  
  module.exports.getLogsFromChain = (
    pairAddress,
    network,
    from_block,
    toBlock
  ) => {
    console.log(network)
    if (getNetwork(network) == 'bsc') {
      return `https://api.bscscan.com/api?module=logs&action=getLogs&toBlock=${toBlock}&fromBlock=${from_block}&address=${pairAddress}&topic0=0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822&apikey=${getKeys(
        'bsc'
      )}`
    } else if (getNetwork(network) == 'polygon') {
      return `https://api.polygonscan.com/api?module=logs&action=getLogs&toBlock=${toBlock}&fromBlock=${from_block}&address=${pairAddress}&topic0=0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822&apikey=${getKeys(
        'polygon'
      )}`
    } else if (getNetwork(network) == 'etherum') {
      return `https://api.etherscan.com/api?module=logs&action=getLogs&toBlock=${toBlock}&fromBlock=${from_block}&address=${pairAddress}&topic0=0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822&apikey=${getKeys(
        'eth'
      )}`
    }
  }
  module.exports.moralisKey =
    'h3RWJYoYZWUk3nNi0RQvyVrKI9HaRanat9i2LsBvz2DKUlPVcgzTBG8jtLzV792K'
  
  module.exports.getEncodedData = (hash, network) => {
    if (
      network.toLocaleLowerCase() === 'Ethereum'.toLocaleLowerCase() ||
      network.toLocaleLowerCase() === 'ETH'.toLocaleLowerCase()
    ) {
      return `https://deep-index.moralis.io/api/v2/transaction/${hash}?chain=eth`
    } else if (
      network.toLocaleLowerCase() === 'Binance'.toLocaleLowerCase() ||
      network.toLocaleLowerCase() === 'BSC'.toLocaleLowerCase()
    ) {
      return `https://deep-index.moralis.io/api/v2/transaction/${hash}?chain=bsc`
    } else if (
      network.toLocaleLowerCase() === 'Polygon'.toLocaleLowerCase() ||
      network.toLocaleLowerCase() === 'MATIC'.toLocaleLowerCase()
    ) {
      return `https://deep-index.moralis.io/api/v2/transaction/${hash}?chain=polygon`
    }
  }
  
  module.exports.TokenAddressUrl = (network, symbol) => {
    if (
      network.toLocaleLowerCase() === 'Ethereum'.toLocaleLowerCase() ||
      network.toLocaleLowerCase() === 'ETH'.toLocaleLowerCase()
    ) {
      return `https://deep-index.moralis.io/api/v2/erc20/metadata/symbols?chain=eth&symbols=${symbol}`
    } else if (
      network.toLocaleLowerCase() === 'Binance'.toLocaleLowerCase() ||
      network.toLocaleLowerCase() === 'BSC'.toLocaleLowerCase()
    ) {
      return `https://deep-index.moralis.io/api/v2/erc20/metadata/symbols?chain=bsc&symbols=${symbol}`
    } else if (
      network.toLocaleLowerCase() === 'Polygon'.toLocaleLowerCase() ||
      network.toLocaleLowerCase() === 'MATIC'.toLocaleLowerCase()
    ) {
      return `https://deep-index.moralis.io/api/v2/erc20/metadata/symbols?chain=polygon&symbols=${symbol}`
    }
  }
  
  module.exports.dexTradeCountQuery = (network, address) => {
    return {
      query: `{\n  ethereum(network: ${network}) {\n    dexTrades(baseCurrency: {is: \"${address}\"}) {\n      count\n      baseCurrency {\n        address\n      }\n    }\n  }\n}\n`,
      variables: '{}'
      // query: `{\n  ethereum(network: ${network}) {\n    dexTrades(baseCurrency: {is: \"${address}\"}) {\n      count\n    }\n  }\n}\n`,
      // variables: '{}'
    }
  }
  
  module.exports.getTokenPriceFromMoralis = (network, address) => {
    if (
      network.toLowerCase() === 'bsc' ||
      network.toLowerCase() === 'Binance'.toLowerCase()
    ) {
      return `https://deep-index.moralis.io/api/v2/erc20/${address}/price?chain=bsc`
    } else if (
      network.toLowerCase() === 'eth' ||
      network.toLowerCase() === 'Ethereum'.toLowerCase()
    ) {
      return `https://deep-index.moralis.io/api/v2/erc20/${address}/price?chain=eth`
    } else if (
      network.toLowerCase() === 'Polygon' ||
      network.toLowerCase() === 'MATIC'.toLowerCase()
    ) {
      return `https://deep-index.moralis.io/api/v2/erc20/${address}/price?chain=polygon`
    }
  }
  
  module.exports.getTokenList = network => {
    if (
      network.toLocaleLowerCase() === 'Binance'.toLocaleLowerCase() ||
      network.toLocaleLowerCase() === 'BSC'.toLocaleLowerCase()
    ) {
      return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/smartchain/tokenlist.json`
    } else if (
      network.toLocaleLowerCase() === 'Ethereum'.toLocaleLowerCase() ||
      network.toLocaleLowerCase() === 'ETH'.toLocaleLowerCase()
    ) {
      return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/tokenlist.json`
    } else if (
      network.toLocaleLowerCase() === 'Polygon'.toLocaleLowerCase() ||
      network.toLocaleLowerCase() === 'MATIC'.toLocaleLowerCase()
    ) {
      return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/polygon/tokenlist.json`
    }
  }
  
module.exports.getKeys = network => {
    if (network == 'bsc') {
      return 'GBBNZ28QERQ8WABZ7ACJIU68VZUJKFXIEU'
    } else if (network == 'polygon') {
      return 'RR3QKYKFPUG3C84QN1GQHCWY8P66ARURQY'
    } else if (nework == 'eth') {
      return 'DWSIIIH85NJMTX3ZTQB2ZPX3P5AVB1GV64'
    }
  }
  
  module.exports.getBscPairs = () => {
    return {
      query: `{\n  ethereum(network: bsc) {\n    arguments(\n      options: {desc: [\"block.height\"], limit: 1000}\n      smartContractEvent: {is: \"PairCreated\"}\n    ) {\n      block {\n        height\n      }\n      index\n      pair: any(of: argument_value, argument: {is: \"pair\"})\n      token0: any(of: argument_value, argument: {is: \"token0\"})\n      token0Name: any(of: argument_value, argument: {is: \"token0\"}, as: token_name)\n      token0Symbol: any(of: argument_value, argument: {is: \"token0\"}, as: token_symbol)\n      token1: any(of: argument_value, argument: {is: \"token1\"})\n      token1Name: any(of: argument_value, argument: {is: \"token1\"}, as: token_name)\n      token1Symbol: any(of: argument_value, argument: {is: \"token1\"}, as: token_symbol)\n   smartContract {\n        address {\n          address\n          annotation\n        }\n      }\n   date {\n        date(format: \"%Y-%m-%d %H:%M:%S\")\n      }\n    }\n  }\n}\n`,
      variables: '{}'
    }
  }
  
  module.exports.getEthPairs = () => {
    return {
      query: `{\n  ethereum(network: ethereum) {\n    arguments(\n      options: {desc: [\"block.height\"], limit: 1000}\n      smartContractEvent: {is: \"PairCreated\"}\n    ) {\n      block {\n        height\n      }\n      index\n      pair: any(of: argument_value, argument: {is: \"pair\"})\n      token0: any(of: argument_value, argument: {is: \"token0\"})\n      token0Name: any(of: argument_value, argument: {is: \"token0\"}, as: token_name)\n      token0Symbol: any(of: argument_value, argument: {is: \"token0\"}, as: token_symbol)\n      token1: any(of: argument_value, argument: {is: \"token1\"})\n      token1Name: any(of: argument_value, argument: {is: \"token1\"}, as: token_name)\n      token1Symbol: any(of: argument_value, argument: {is: \"token1\"}, as: token_symbol)\n   smartContract {\n        address {\n          address\n          annotation\n        }\n      }\n   date {\n        date(format: \"%Y-%m-%d %H:%M:%S\")\n      }\n    }\n  }\n}\n`,
      variables: '{}'
    }
  }
  
  module.exports.getPolygonPairs = () => {
    return {
      query: `{\n  ethereum(network: matic) {\n    arguments(\n      options: {desc: [\"block.height\"], limit: 1000}\n      smartContractEvent: {is: \"PairCreated\"}\n    ) {\n      block {\n        height\n      }\n      index\n      pair: any(of: argument_value, argument: {is: \"pair\"})\n      token0: any(of: argument_value, argument: {is: \"token0\"})\n      token0Name: any(of: argument_value, argument: {is: \"token0\"}, as: token_name)\n      token0Symbol: any(of: argument_value, argument: {is: \"token0\"}, as: token_symbol)\n      token1: any(of: argument_value, argument: {is: \"token1\"})\n      token1Name: any(of: argument_value, argument: {is: \"token1\"}, as: token_name)\n      token1Symbol: any(of: argument_value, argument: {is: \"token1\"}, as: token_symbol)\n    smartContract {\n        address {\n          address\n          annotation\n        }\n      }\n  date {\n        date(format: \"%Y-%m-%d %H:%M:%S\")\n      }\n    }\n  }\n}\n`,
      variables: '{}'
    }
  }
  
  module.exports.getSwapPairsQuery = swapName => {
    if (swapName.toLocaleLowerCase() === 'Uniswap'.toLocaleLowerCase()) {
      return {
        query: `{\n  ethereum(network: ethereum) {\n    dexTrades(\n      options: {limit: 100, desc: \"TradeCount\"}\n      exchangeName: {is: \"Uniswap\"}\n    ) {\n      exchange {\n        fullName\n      }\n      Pair: smartContract {\n        address {\n          address\n        }\n      }\n      tokenA: baseCurrency {\n        address\n        name\n        symbol\n      }\n      tokenB: quoteCurrency {\n        address\n        name\n        symbol\n      }\n      TradeCount: count\n    }\n  }\n}`,
        variables: '{}'
      }
    } else if (swapName.toLocaleLowerCase() === 'SushiSwap'.toLocaleLowerCase()) {
      return {
        query: `{\n  ethereum(network: ethereum) {\n    dexTrades(\n      options: {limit: 100, desc: \"TradeCount\"}\n      exchangeName: {is: \"SushiSwap\"}\n    ) {\n      exchange {\n        fullName\n      }\n      Pair: smartContract {\n        address {\n          address\n        }\n      }\n      tokenA: baseCurrency {\n        address\n        name\n        symbol\n      }\n      tokenB: quoteCurrency {\n        address\n        name\n        symbol\n      }\n      TradeCount: count\n    }\n  }\n}`,
        variables: '{}'
      }
    } else if (
      swapName.toLocaleLowerCase() === 'Pancakeswap'.toLocaleLowerCase()
    ) {
      return {
        query: `{\n  ethereum(network: bsc) {\n    dexTrades(\n      options: {limit: 100, desc: \"TradeCount\"}\n      exchangeName: {is: \"Pancake v2\"}\n    ) {\n      exchange {\n        fullName\n      }\n      Pair: smartContract {\n        address {\n          address\n        }\n      }\n      tokenA: baseCurrency {\n        address\n        name\n        symbol\n      }\n      tokenB: quoteCurrency {\n        address\n        name\n        symbol\n      }\n      TradeCount: count\n    }\n  }\n}`,
        variables: '{}'
      }
    } else if (swapName.toLocaleLowerCase() === 'Quickswap'.toLocaleLowerCase()) {
      return {
        query: `{\n  ethereum(network: matic) {\n    dexTrades(\n      options: {limit: 100, desc: \"TradeCount\"}\n      exchangeName: {is: \"QuickSwap\"}\n    ) {\n      exchange {\n        fullName\n      }\n      Pair: smartContract {\n        address {\n          address\n        }\n      }\n      tokenA: baseCurrency {\n        address\n        name\n        symbol\n      }\n      tokenB: quoteCurrency {\n        address\n        name\n        symbol\n      }\n      TradeCount: count\n    }\n  }\n}`,
        variables: '{}'
      }
    }
  }
  
  module.exports.getWhaleQuery = (network, amount, condition, address) => {
    return {
      query: `{\n  ethereum(network: ${network}) {\n    transfers(\n      options: {desc: \"block.timestamp.time\", limit: 1}\n      amount: {${condition}: ${amount}}\n      currency: {is: \"${address}\"}\n    ) {\n      block {\n        timestamp {\n          time(format: \"%Y-%m-%d %H:%M:%S\")\n        }\n        height\n      }\n      sender {\n        address\n        annotation\n      }\n      receiver {\n        address\n        annotation\n      }\n      transaction {\n        hash\n      }\n      USDAmount: amount(in: USD)\n      ETHAmount: amount(in: ETH)\n      currency {\n        symbol\n      }\n      external\n    }\n  }\n}\n`,
      variables: "{}"
    }
  }
  
  module.exports.getCompoundProtocolUrl = () => {
    return `https://api.compound.finance/api/v2/ctoken`
  }
  
  module.exports.getCompoundProtocolAlertUrl = (ctoken) => {
    return `https://api.compound.finance/api/v2/ctoken?CToken=${ctoken}`
  }
  
  module.exports.getCompoundAccountsUrl = (page) => {
    return `https://api.compound.finance/api/v2/account?addresses&page_number=${page}&page_size=300`
  }
  
  module.exports.getCompoundLiquidity = (address) => {
    return `https://api.compound.finance/api/v2/account?addresses[]=${address}`
  }
  
  // MarketOverview - Top 5 NFT sales
  module.exports.getTopNftSalesUrl = () => {
    return `https://api.opensea.io/api/v1/assets?format=json&limit=5&offset=0&order_by=sale_count&order_direction=desc`
  }
  
  
  module.exports.getUserPoolsInfoFromDebankUrl = (userAddress, chain) => {
    let network = getDebankSupportedNetwork(chain)
    return `https://pro-openapi.debank.com/v1/user/complex_protocol_list?id=${userAddress}&chain_id=${network}`
  }
  