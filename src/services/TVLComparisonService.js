const { getMethod } = require("../utilities/methods")
const { supportNetworks } = require("../utilities/networks")
const { getAllChartsUrl } = require("../utilities/urls")
const { totalLiquidityUSD, lastWeek, previousWeek } = require("../utilities/utility")



const getTVLComparisonService = async (req, res, next) => {
    try {
      let chains = []
      supportNetworks().forEach(network => {
        chains.push(getMethod(getAllChartsUrl(network.name)))
      })
      const data = await Promise.all(chains)
      const resp = totalLiquidityUSD(data, supportNetworks())
      const lastWeekData = await lastWeek(resp)
      const previousWeekData = await previousWeek(resp)
      return {
        status: 200,
        message: 'Fetch TVL Comparison Data',
        data: { currrentWeekData: lastWeekData, previousWeekData: previousWeekData },
      };
      
    } catch (err) {
        throw new err
    }
  }

  module.exports= { getTVLComparisonService}