const { networks } = require('../config')
const moment = require('moment')
const network = require('./network')

module.exports.supportNetworks = () => {
  // "ethereum",
  // "bsc",
  // "matic"
  return [
    // {
    //     name: "All",
    //     icon: '',
    //     orderID: 1
    // },
    {
      name: 'Ethereum',
      icon: '/assets/images/Ethereum.png',
      orderID: 2,
      oneInchId: 1,
      unmarshal: 'ethereum'
    },
    {
      name: 'Polygon',
      icon: '/assets/images/binance.png',
      orderID: 3,
      oneInchId: 137,
      unmarshal: 'matic'
    },
    {
      name: 'Binance',
      icon: 'assets/images/polygon.png',
      orderID: 4,
      oneInchId: 56,
      unmarshal: 'bsc'
    }
  ]
}

const getDebankSupportedNetwork = network => {
  if (
    network.toLocaleLowerCase() === 'Polygon'.toLocaleLowerCase() ||
    network.toLocaleLowerCase() === 'MATIC'.toLocaleLowerCase()
  ) {
    return 'matic'
  } else if (
    network.toLocaleLowerCase() === 'Binance'.toLocaleLowerCase() ||
    network.toLocaleLowerCase() === 'BSC'.toLocaleLowerCase()
  ) {
    return 'bsc'
  } else if (
    network.toLocaleLowerCase() === 'Ethereum'.toLocaleLowerCase() ||
    network.toLocaleLowerCase() === 'ETH'.toLocaleLowerCase()
  ) {
    return 'eth'
  }
}

module.exports.unmarshalSupportNetworks = () => {
  return ['ethereum', 'bsc', 'matic']
}

module.exports.moralisSupportNetworks = () => {
  return ['eth', 'bsc', 'polygon']
}

const getNetwork = network => {
  if (
    network.toLocaleLowerCase() === 'Polygon'.toLocaleLowerCase() ||
    network.toLocaleLowerCase() === 'MATIC'.toLocaleLowerCase()
  ) {
    return 'polygon'
  } else if (
    network.toLocaleLowerCase() === 'Binance'.toLocaleLowerCase() ||
    network.toLocaleLowerCase() === 'BSC'.toLocaleLowerCase()
  ) {
    return 'bsc'
  } else if (
    network.toLocaleLowerCase() === 'Ethereum'.toLocaleLowerCase() ||
    network.toLocaleLowerCase() === 'ETH'.toLocaleLowerCase()
  ) {
    return 'eth'
  }
}

module.exports.mappingNetworks = networks => {
  if (
    networks.toLowerCase() === 'Ethereum'.toLowerCase() ||
    networks.toLowerCase() === 'ethereum'.toLowerCase() ||
    networks.toLowerCase() === 'eth'.toLowerCase()
  ) {
    return 'Ethereum'
  }
  if (
    networks.toLowerCase() === 'bsc'.toLowerCase() ||
    networks.toLowerCase() === 'Binance'.toLowerCase()
  ) {
    return 'Binance'
  }
  if (
    networks.toLowerCase() === 'Polygon'.toLowerCase() ||
    networks.toLowerCase() === 'matic'.toLowerCase()
  ) {
    return 'Polygon'
  }
  return ''
}

module.exports.mappingNetworksCoin = networks => {
  if (
    networks.toLowerCase() === 'Ethereum'.toLowerCase() ||
    networks.toLowerCase() === 'ethereum'.toLowerCase() ||
    networks.toLowerCase() === 'eth'.toLowerCase()
  ) {
    return 'ETH'
  }
  if (
    networks.toLowerCase() === 'bsc'.toLowerCase() ||
    networks.toLowerCase() === 'Binance'.toLowerCase()
  ) {
    return 'BNB'
  }
  if (
    networks.toLowerCase() === 'Polygon'.toLowerCase() ||
    networks.toLowerCase() === 'matic'.toLowerCase()
  ) {
    return 'MATIC'
  }
  return ''
}

module.exports.mappingBitQueryFields = networks => {
  if (
    networks.toLowerCase() === 'Ethereum'.toLowerCase() ||
    networks.toLowerCase() === 'ethereum'.toLowerCase()
  ) {
    return 'ethereum'
  }
  if (
    networks.toLowerCase() === 'bsc'.toLowerCase() ||
    networks.toLowerCase() === 'Binance'.toLowerCase()
  ) {
    return 'bsc'
  }
  if (
    networks.toLowerCase() === 'Polygon'.toLowerCase() ||
    networks.toLowerCase() === 'matic'.toLowerCase()
  ) {
    return 'matic'
  }
  return ''
}

module.exports.coingeckoSupportNetworks = network => {
  if (
    network.toLowerCase() === 'Ethereum'.toLowerCase() ||
    network.toLowerCase() === 'ethereum'.toLowerCase()
  ) {
    return 'ethereum'
  }
  if (
    network.toLowerCase() === 'bsc'.toLowerCase() ||
    network.toLowerCase() === 'binance-smart-chain'.toLowerCase() ||
    network.toLowerCase() === 'Binance'.toLowerCase()
  ) {
    return 'binance-smart-chain'
  }
  if (
    network.toLowerCase() === 'Polygon'.toLowerCase() ||
    network.toLowerCase() === 'polygon-pos'.toLowerCase() ||
    network.toLowerCase() === 'matic'.toLowerCase()
  ) {
    return 'polygon-pos'
  }
}

module.exports.NftTradeSupportNetworks = network => {
  if (
    network.toLowerCase() === 'Ethereum'.toLowerCase() ||
    network.toLowerCase() === 'eth'.toLowerCase() ||
    network.toLowerCase() === 'ethereum'.toLowerCase()
  ) {
    return 'eth'
  }
  if (
    network.toLowerCase() === 'bsc'.toLowerCase() ||
    network.toLowerCase() === 'binance-smart-chain'.toLowerCase() ||
    network.toLowerCase() === 'Binance'.toLowerCase()
  ) {
    return 'bsc'
  }
  if (
    network.toLowerCase() === 'Polygon'.toLowerCase() ||
    network.toLowerCase() === 'matic'.toLowerCase()
  ) {
    return 'polygon'
  }
}
