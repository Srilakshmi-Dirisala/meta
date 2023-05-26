const { getMethod } = require("../../utilities/methods")
const { supportNetworks } = require("../../utilities/networks")
const { getTokenTransactionsForChain } = require("../../utilities/urls")
const { serialize } = require("../../utilities/utility")

const getPortfolioTransactionService = async (req, res, next) => {
    try {
  
      let page = req.params.page
      const NetworkOrCoin = req.params.NetworkOrCoin
  
      let chain = supportNetworks().find(x => x.name.toLowerCase() === NetworkOrCoin.toLocaleLowerCase())
      const q = serialize(req.query)
      const data = await getMethod(getTokenTransactionsForChain(chain.unmarshal, req.headers.address, page))
      if (!data.status) {
return{
    status:400,
    message:"Failed"
}        
      }
      return{
        status:200,
        message:"getPortfolioTransaction",
        data:data ? data.data : []
      }
    } catch (err) {
throw new err    }
  }

  module.exports={getPortfolioTransactionService}