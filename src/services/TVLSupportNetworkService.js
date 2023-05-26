const { getMethod } = require("../utilities/methods")
const { supportNetworks } = require("../utilities/networks")
const { getAllChartsUrl } = require("../utilities/urls")
const { totalLiquidityUSD } = require("../utilities/utility")

const getSupportNetworksTVLService = async (req, res, next) => {
    let chains = []
    supportNetworks().forEach(network => {
      chains.push(getMethod(getAllChartsUrl(network.name)))
    })
    const data = await Promise.all(chains)
    // if (!data.status) {
    //     responseHandler.errorResponse(res, data.message)
    //     return;
    // }
    const resp = totalLiquidityUSD(data, supportNetworks())
  
    return {
      status: 200,
      message: 'Fetch support networks TVL',
      data: { ...resp },
    };
      }
  
  module.exports = {getSupportNetworksTVLService}