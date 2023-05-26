const { getMethod } = require("../../utilities/methods")
const { getNftsUrl } = require("../../utilities/urls")

const getNftsService = async (req, res, next) => {
    try {
      req.query.Address = req.params.Address
      const Address = req.query.Address
      let chains = []
      const networks = ['bsc', 'ethereum', 'matic']
  
      networks.forEach(network => {
        chains.push(getMethod(getNftsUrl(network, rea.headers.address)))
      })
      const data = await Promise.all(chains)
      const resp = []
      networks.forEach((network, index) => {
        if (data[index].status) {
          resp.push(data[index])
        }
      })
      return{
        status:200,
        message:"Fetch Nfts of User",
        data:resp
      }
    } catch (err) {
        throw new err
    }
  }

  module.exports = {getNftsService}