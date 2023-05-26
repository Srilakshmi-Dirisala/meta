const { getMethod } = require("../../utilities/methods")
const { supportNetworks } = require("../../utilities/networks")
const { kingDefiMarketCap, defiPulseforTvl } = require("../../utilities/urls")
const { chainDataFilterForText } = require("../../utilities/utility")



const getMarketDexTvlService = async (req, res, next) => {
    try {
      req.params.NetworkOrCoin = req.params.NetworkOrCoin || 'all'
  
      if (!supportNetworks().find(x => x.name.toLowerCase() === req.params.NetworkOrCoin.toLowerCase())) {
        req.params.NetworkOrCoin = 'all'
      }
      const NetworkOrCoin = req.params.NetworkOrCoin
        ? req.params.NetworkOrCoin.toLowerCase() === 'all'
          ? ''
          : req.params.NetworkOrCoin
        : ''
      if (NetworkOrCoin) {
        let list = []
        let DataChain = supportNetworks().find(
          x => x.name.toLowerCase() === NetworkOrCoin.toLowerCase()
        )
        const redisName = `getMarketDexTvlService-${DataChain.name}`
        //console.log(redisName)
        const RedisData = await redis.getParameter(redisName)
        if (RedisData.status) {
            return{
                status:200,
                message:"getMarketDexTvlService - R",
                data:RedisData.data
            }
          
        }
        if (DataChain.name === 'Binance') {
          const data = await getMethod(kingDefiMarketCap())
          if (data.data.data) {
            data.data.data = data.data.data.slice(0, 10)
            list = data.data.data.map(x => {
              return {
                name: x.coin.name,
                value: x.tvl,
                chain: 'Binance'
              }
            })
          }
        } else {
          const data = await getMethod(defiPulseforTvl())
          if (data.data) {
            data.data = chainDataFilterForText(data.data, 'chain', NetworkOrCoin)
            data.data = data.data.slice(0, 10)
            list = data.data.map(x => {
              return {
                name: x.name,
                value: x.value.tvl.USD.value,
                chain: NetworkOrCoin
              }
            })
          }
        }
        if (list.length) {
          redis.setParameter(redisName, list)
        }
        return{
            status:200,
            message:"getMarketDexTvlService",
            data:list
        }
      } else {
        let list = []
        const dataResp = await getMethod(defiPulseforTvl())
        const data = await getMethod(kingDefiMarketCap())
        if (data.data.data) {
          data.data.data = data.data.data.slice(0, 10)
          data.data.data.forEach(x => {
            list.push({
              name: x.coin.name,
              value: x.tvl,
              chain: 'Binance'
            })
          })
        }
        if (dataResp.data) {
          data.data = chainDataFilterForText(data.data, 'chain', NetworkOrCoin)
          dataResp.data = dataResp.data.slice(0, 10)
          dataResp.data.forEach(x => {
            list.push({
              name: x.name,
              value: x.value.tvl.USD.value,
              chain: x.chain
            })
          })
        }
  return{
    status:200,
    message:"getMarketDexTvlService",
    data:list
  }
      }
    } catch (err) {
throw new err    }
  }

  module.exports = {getMarketDexTvlService}