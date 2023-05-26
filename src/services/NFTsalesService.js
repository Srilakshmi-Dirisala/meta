const { getMethod } = require("../../utilities/methods")
const { getNftSalesUrl } = require("../../utilities/urls")
const { getNftSalesData } = require("../../utilities/utility")

const getNftSalesService = async (req, res, next) => {
    try {
      const data = await getMethod(getNftSalesUrl())
      const nftSalesData = await getNftSalesData(data)
      if (!data.status) {
        return {
            status: 400,
            message: data.message,
          };  
      }
      return {
        status: 200,
        message: 'Fetch Nft Sales',
        data:  nftSalesData,
    }
    } catch (err) {
      console.log(err)
    }
  }
  
  module.exports = { getNftSalesService}