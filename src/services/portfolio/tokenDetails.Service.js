const { getMethod } = require("../../utilities/methods")
const { coingeckoSupportNetworks } = require("../../utilities/networks")
const { tokenPriceUrl } = require("../../utilities/urls")

const getTokenDetailsService = async (req, res, next) => {
    try {
      req.query.Address = req.params.Address
      const network = req.params.network
      const Address = req.params.Address
  
      const data = await getMethod(
        tokenPriceUrl(coingeckoSupportNetworks(network), Address)
      )
      if (!data.status) {
    return{
        status:400,
        message:"Failed"
    }      }
    return{
        status:200,
        message:"Token Price, Marketcap in USD",
        data:data.data ? Object.values(data.data) : ''
    }
      
    } catch (err) {

throw new err    }
  }
  module.exports = {getTokenDetailsService}