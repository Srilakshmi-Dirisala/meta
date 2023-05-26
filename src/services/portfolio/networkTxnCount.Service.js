const { postMethod } = require("../../utilities/methods")
const { mappingBitQueryFields } = require("../../utilities/networks")
const { getBitqueryUrl, ChainTxCountUrl } = require("../../utilities/urls")

const getNetworkTxnCountService = async (req, res, next) => {
    try {
      req.query.network = req.params.network
      const network = req.params.network
      const redisName = `networkTransactionCount-${network}`
      let Network = mappingBitQueryFields(network)
      if (Network) {
        const RedisData = await redis.getParameter(redisName)
        if (RedisData.status) {
            return{
                status:200,
                message:"Fetch total transaction count - R",
                data:RedisData.data

            }
         
        }
        const data = await postMethod(getBitqueryUrl(), ChainTxCountUrl(Network))
        let resp = []
        if (
          data &&
          data.data &&
          data.data.data &&
          data.data.data.ethereum &&
          data.data.data.ethereum.transactions
        ) {
          resp = data.data.data.ethereum.transactions
        }
        if (resp.length) {
          redis.setParameter(redisName, resp)
        }
        return{
            status:200,
            message:"Transaction count, fee of given network",
            data:resp
        }
        
      } else {

return{
    status:400,
    message:"Failed"
}    }
    } catch (err) {
throw new err    }
  }

  module.exports = {getNetworkTxnCountService}