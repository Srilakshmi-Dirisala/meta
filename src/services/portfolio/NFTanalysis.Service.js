const { getMethod } = require("../../utilities/methods")
const { coinmarketcapNFT } = require("../../utilities/urls")

const nftAnalysisService = async (req) => {
    try {
      const NetworkOrCoin = req.params.type
        ? req.params.type.toLowerCase() === 'all'
          ? ''
          : req.params.type
        : ''
      const url = coinmarketcapNFT(NetworkOrCoin)
      const data = await getMethod(url)
      if (!data.status) {
        return{
            status:400,
            message:"Failed",
            data:[]
        }
        // responseHandler.errorResponse(res, data.message)
        // return
      }
      return{
        status:200,
        message:"Fetch NFT analysis",
        data:data
      }
    } catch (err) {
        throw new err    }
  }
  
  module.exports= {nftAnalysisService}