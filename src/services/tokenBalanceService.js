const { getMethod } = require("../../utilities/methods")
const { getPoolTokensUrl } = require("../../utilities/urls")


const getgetTokenBalanceService = async (req, res, next) => {
    req.query.Network = req.params.Network
    req.query.Address = req.params.Address
    const Network = req.params.Network
    const Address = req.params.Address
    const data = await getMethod(getPoolTokensUrl(Network, Address))
    if (!data.status) {
      return {
        status: 500,
        message: data.message,
        data:data
      };
    }
    return {
      status: 200,
      message: 'Fetch token balance',
      data: { TokenBalance: data.data },
    };
    
  }

  module.exports = {getgetTokenBalanceService}