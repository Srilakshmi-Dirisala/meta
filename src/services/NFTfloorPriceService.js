const { getMethod } = require("../../utilities/methods")
const { nftFloorPrice } = require("../../utilities/urls")

const getNftFloorPriceService = async (req, res, next) => {
    try {
      req.query.id = req.params.id
      const contractId = req.params.id
      if (contractId) {
        const data = await getMethod(nftFloorPrice(contractId))
        return{
            status:200, 
            message:"NFT Floor Price", 
            data:data
        }
      } else {
        return {
            status: 400,
            message: data.message,
          };  
        }
    } catch (err) {
        throw new err  }
  }

  module.exports = {getNftFloorPriceService}