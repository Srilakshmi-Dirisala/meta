const { getMethod } = require("../../../utilities/methods")
const { supportNetworks } = require("../../../utilities/networks")
const { getAllProtocolsUrl, getAllChartsUrl } = require("../../../utilities/urls")
const { chainDataFilter } = require("../../../utilities/utility")


const getAllChartsService = async (req,res) => {
    try {
      req.params.NetworkOrCoin = req.params.NetworkOrCoin || 'all'
  
      if (
        !supportNetworks().find(
          x => x.name.toLowerCase() === req.params.NetworkOrCoin.toLowerCase()
        )
      ) {
        req.params.NetworkOrCoin = 'all'
      }
  
      const NetworkOrCoin = req.params.NetworkOrCoin
        ? req.params.NetworkOrCoin.toLowerCase() === 'all'
          ? ''
          : req.params.NetworkOrCoin
        : ''
      const redisName = `getAllCharts-${NetworkOrCoin}`
      // console.log(redisName)
      const RedisData = await redis.getParameter(redisName)
      if (RedisData.status) {
        return{
            status:200,
            message:'Fetch charts - R',
            data:RedisData.data
        }
        
      }
      const data = await Promise.all([
        getMethod(getAllChartsUrl(NetworkOrCoin)),
        getMethod(getAllProtocolsUrl())
      ])
      const protocols = tvlDataSort(chainDataFilter(data[1].data, 'chains', req.params.NetworkOrCoin), 'chainTvls', req.params.NetworkOrCoin)
  
      const chartDataFiltered = data[0].data
      let change = 100
      if (chartDataFiltered.length > 1) {
        change =
          ((chartDataFiltered[chartDataFiltered.length - 1].totalLiquidityUSD -
            chartDataFiltered[chartDataFiltered.length - 2].totalLiquidityUSD) /
            chartDataFiltered[chartDataFiltered.length - 2].totalLiquidityUSD) *
          100
      }
      let totalVolumeUSD =
        chartDataFiltered[chartDataFiltered.length - 1].totalLiquidityUSD
      const topToken = { name: 'Uniswap', tvl: 0 }
      if (protocols.length > 0) {
        topToken.name = protocols[0].name
        topToken.tvl = protocols[0].chainTvls[req.params.NetworkOrCoin]
      }
      const resp = {
        chart: data[0].data,
        protocols: protocols, // protocols, // data[1].data //chainDataFilter
        dashboard: {
          tvl: data[0].data[data[0].data.length - 1].totalLiquidityUSD,
          dominance: {
            name: protocols[0].name,
            value: ((topToken.tvl / totalVolumeUSD) * 100.0).toFixed(2) // ((protocols[0].tvl / data[0].data[data[0].data.length - 1].totalLiquidityUSD) * 100).toFixed(2)
          },
          change: change.toFixed(2)
        }
      }
      redis.setParameter(redisName, resp)
      return{
        status:200,
        message:'Fetch charts',
        data:resp
      }
    } catch (err) {
        throw new err
    }
    // res.json({ ...data, status: true });
  }
  
  module.exports = {getAllChartsService}