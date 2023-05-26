const { error } = require("server/router")

module.exports.getTokenPairInfoServices = async (req) => {
    try {
      const network = req.params.network
      const tokenNameOrAddress = req.params.tokenNameOrAddress
  
      let data = []
      if (network && tokenNameOrAddress) {
        if (network === 'Binance') {
          data = await bscPairs.find({ $text: { $search: tokenNameOrAddress } })
          if (data && data.length > 0) {
            
            return{status:200,message:"Token Info",data:data}
          }
          else {
           
            return{status:400,message:"Please provide valid token"}
          }
        } else if (network === 'Polygon') {
          data = await polygonPairs.find({ $text: { $search: tokenNameOrAddress } })
          if (data && data.length > 0) {
           
            return{status:200,message:"Token Info",data:data}
          }
          else {
            return{status:400,message:"Please provide valid token"}
          }
        } else if (network === 'Ethereum') {
          data = await ethPairs.find({ $text: { $search: tokenNameOrAddress } })
          if (data && data.length > 0) {
            return{status:200,message:"Token Info",data:data}
          }
          else {
            return{status:400,message:"Please provide valid token"}
          }
        }
      }
      else {
       
        return{status:400,message:"Please provide valid token"}
      }
    } catch (err) {
      console.log(err)
     throw new Error
    }
  }