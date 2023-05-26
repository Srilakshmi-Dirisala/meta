const { postMethod, getMethod } = require("../../utilities/methods")
const { supportNetworks, mappingBitQueryFields } = require("../../utilities/networks")
const { getBitqueryUrl, getMarketCapForDefi, kingDefiMarketCap } = require("../../utilities/urls")
const { dataSort } = require("../../utilities/utility")



const getMarketCapitalizationService = async (req, res, next) => {
    try {
      req.params.NetworkOrCoin = req.params.NetworkOrCoin || 'all'
  
      if (
        !supportNetworks().find(
          x => x.name.toLowerCase() === req.params.NetworkOrCoin.toLowerCase()
        )
      ) {
        req.params.NetworkOrCoin = 'all'
      }
      const NetworkOrCoin = req.params.NetworkOrCoin
        ? req.params.NetworkOrCoin.toLowerCase() === 'all'
          ? ''
          : req.params.NetworkOrCoin
        : ''
      if (NetworkOrCoin) {
        const redisName = `marketCapitalization-${NetworkOrCoin}`
        const RedisData = await redis.getParameter(redisName)
        if (RedisData.status) {
            return{
                status:200,
                message:"marketCapitalization - R",
                data:RedisData.data,
            }
          
        }
  
        marketCapitalization
        let list = []
        let DataChain = supportNetworks().find(
          x => x.name.toLowerCase() === NetworkOrCoin.toLowerCase()
        )
        const data = await postMethod(
          getBitqueryUrl(),
          getMarketCapForDefi(mappingBitQueryFields(NetworkOrCoin))
        )
  
          getMarketCapForDefi(mappingBitQueryFields(NetworkOrCoin))
        
        if (
          data.data &&
          data.data.data &&
          data.data.data.ethereum &&
          data.data.data.ethereum.dexTrades
        ) {
          list = data.data.data.ethereum.dexTrades.map(x => {
            return {
              name: x.exchange.fullName,
              value: x.tradeAmount,
              chain: NetworkOrCoin
            }
          })
        }
  
        // }
        if (list.length) {
          redis.setParameter(redisName, list)
        }
        return{
            status:200,
            message:"marketCapitalization",
            data:list
        }
      } else {
        let list = []
        const data = await Promise.all([
          getMethod(kingDefiMarketCap()),
          postMethod(
            getBitqueryUrl(),
            getMarketCapForDefi(mappingBitQueryFields(supportNetworks()[1].name))
          ),
          postMethod(
            getBitqueryUrl(),
            getMarketCapForDefi(mappingBitQueryFields(supportNetworks()[0].name))
          )
        ])
        if (data[0].data && data[0].data.data) {
          data[0].data.data = data[0].data.data.slice(0, 5)
          data[0].data.data.forEach(x => {
            list.push({
              name: x.coin.name,
              value: x.market_cap,
              chain: 'Binance'
            })
          })
        }
        if (
          data[1].data &&
          data[1].data.data &&
          data[1].data.data.ethereum &&
          data[1].data.data.ethereum.dexTrades
        ) {
          data[1].data.data.ethereum.dexTrades.forEach(x => {
            list.push({
              name: x.exchange.fullName,
              value: x.tradeAmount,
              chain: 'Polygon'
            })
          })
        }
        if (
          data[2].data &&
          data[2].data.data &&
          data[2].data.data.ethereum &&
          data[2].data.data.ethereum.dexTrades
        ) {
          data[2].data.data.ethereum.dexTrades.forEach(x => {
            list.push({
              name: x.exchange.fullName,
              value: x.tradeAmount,
              chain: 'Ethereum'
            })
          })
        }
        list = dataSort(list, 'value')
        return{
            status:200,
            message:"marketCapitalization",
            data:list
        }
      }
    } catch (err) {
        throw new err    }
  }

  module.exports = {getMarketCapitalizationService}