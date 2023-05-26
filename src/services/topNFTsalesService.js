const { getMethod } = require("../../utilities/methods")
const { topNftSalesUrl } = require("../../utilities/urls")

const getTopNftSalesService = async (req) => {
    try {
      req.query.network = req.params.network
      const network = req.params.network
      if (network) {
        const data = await getMethod(topNftSalesUrl(network))
        let resp = []
        if (data && data.data && data.data.length !== 0) {
          data.data.map(x => {
            let obj = {
              contractName: x.contractName,
              contractAddress: x.contractAddress,
              contractId: x.contractId,
              tokenID: x.tokenID,
              name: x.name,
              image: x.image,
              price: x.price,
              createdAt: x.createdAt,
              last_sell: x.last_sell,
              chainId: x.chainId
            }
            resp.push(obj)
          })
        }
        return {
            status: 200,
            message: 'Top NFT sales Details',
            data:resp
          }; 
      } else {
        return {
            status: 400,
            message: data.message,
          };        }
    } catch (err) {
        return {
            status: 400,
            message: data.message,
          };      }
  }

  module.exports = {getTopNftSalesService}