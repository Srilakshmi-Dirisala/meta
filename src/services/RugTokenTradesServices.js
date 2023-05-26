const { postMethod } = require("../utilities/methods")
const { mappingBitQueryFields } = require("../utilities/networks")
const { getTokenTradesUrl, getBitqueryUrl } = require("../utilities/urls")

module.exports.getRugTokenTradesServices = async (req) => {
    try {
      const network = req.params.network
      const Address = req.params.Address
  
      if (network && Address) {
     
        const Network = mappingBitQueryFields(network)
        let query = getTokenTradesUrl(Network, Address)
        const data = await postMethod(getBitqueryUrl(), query)
        // redis.setParameter(redisName, bitQueryDex(data))
        
        return{status:200,message:"Rug Token Trades",data:bitQueryDex(data)}
      } else {
        return{status:400,message:"fail",data:[]}
      
      }
    } catch (err) {
    throw new err
    }
  }