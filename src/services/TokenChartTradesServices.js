const { postMethod } = require("../utilities/methods")
const { mappingBitQueryFields } = require("../utilities/networks")
const { getTokenChartTradesQuery, getBitqueryUrl } = require("../utilities/urls")
const { bitQueryDex } = require("../utilities/utility")

module.exports.getTokenChartTradesServices = async (req) => {
    try {
      const network = req.params.network
      const Address = req.params.Address
      if (network && Address) {
        // const redisName = `getTokenChartsTrades-${network}-${Address}`
        // const RedisData = await redis.getParameter(redisName)
        // if (RedisData.status) {
        //   responseHandler.successResponse(res, RedisData.data, 'Fetch Trades - R')
        //   return null
        // }
        const Network = mappingBitQueryFields(network)
        let query = getTokenChartTradesQuery(Network, Address)
        const data = await postMethod(getBitqueryUrl(), query)
        // redis.setParameter(redisName, bitQueryDex(data))
        
        return{status:200,message:"TokenChart Trades!",data: bitQueryDex(data)}
      } else {
        console.log(err)
        throw new Error
      }
    } catch (err) {
      console.log(err)
     throw new Error
    }
  }