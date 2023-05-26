const { getMethod } = require("../../../utilities/methods")
const { unmarshalSupportNetworks, mappingNetworks } = require("../../../utilities/networks")
const { getPoolTokensUrl, getTokenTransactions } = require("../../../utilities/urls")


const portfolioService = async (req, res, next) => {
    try {
      const resp = await Promise.all([
        getAllTokenBalance(req.headers.address),
        await getAllTokenTransactions(req.headers.address)
      ])
  
      const balance = resp[0]
      const transactions = resp[1]
      return{
        status:200,
        message:"portfolio",
        data:{ balance, transactions }
      }
    } catch (err) {
        throw new err    
    }
  }

  const getAllTokenBalance = async Address => {
    let list = []
    // req.query.Address = req.params.Address
    // const Address = req.params.Address
    unmarshalSupportNetworks().forEach(network => {
      list.push(getMethod(getPoolTokensUrl(network, Address)))
    })
    const resp = await Promise.all(list)
    let tokens = {}
    unmarshalSupportNetworks().forEach((network, index) => {
      if (resp[index].status) {
        tokens[mappingNetworks(network)] = resp[index].data
      } else {
        tokens[network] = []
      }
    })
    return tokens
  }

  const getAllTokenTransactions = async Address => {
    let list = []
    unmarshalSupportNetworks().forEach(network => {
      list.push(getMethod(getTokenTransactions(network, Address)))
    })
    const resp = await Promise.all(list)
    let tokens = {}
    unmarshalSupportNetworks().forEach((network, index) => {
      if (resp[index].status) {
        tokens[mappingNetworks(network)] = resp[index].data
      } else {
        tokens[network] = []
      }
    })
    return tokens
  }

  module.exports = {
    portfolioService,
    getAllTokenBalance,
    getAllTokenTransactions
}