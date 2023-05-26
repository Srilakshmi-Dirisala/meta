const { postMethod } = require("../utilities/methods")
const { mappingBitQueryFields } = require("../utilities/networks")
const { pairsForTokenQuery, getBitqueryUrl, moralisDexTradesUrl, moralisDexTradesPayload } = require("../utilities/urls")

module.exports.moralisDexTradesServices = async (req, res, next) => {
    try {
      const network = req.params.network
      const Address = req.params.Address
      if (network && Address) {
        const Network = mappingBitQueryFields(network)
        let query = pairsForTokenQuery(Network, Address)
        const data = await Promise.all([
          postMethod(getBitqueryUrl(), query),
          postMethod(moralisDexTradesUrl(network), moralisDexTradesPayload())
        ])
        let trades = []
        if (data && data.length > 0) {
          if (
            data[0].status &&
            data[0].data &&
            data[0].data.data &&
            data[0].data.data.ethereum &&
            data[0].data.data.ethereum.dexTrades &&
            data[0].data.data.ethereum.dexTrades.length > 0 &&
            data[1].status &&
            data[1].data &&
            data[1].data.results &&
            data[1].data.results.length > 0
          ) {
            data[0].data.data.ethereum.dexTrades.forEach(x => {
              data[1].data.results.forEach(y => {
                if (x.pairAddress.address.address === y.address) {
                  trades.push(y)
                }
              })
            })
          }
        }
       
        return{status:200,message:"Dex Trades !",data:trades}
      } else {
        console.log(err)
        return{status:400,message:"InSufficient Data!'"}
       
      }
    } catch (err) {
      console.log(err)
      throw new Error
     
    }
  }