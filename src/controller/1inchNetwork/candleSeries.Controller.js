const { candleSeriesService } = require('../../services/1inchNetwork/candleSeries.Service')
const { callService } = require('../callService')

const candleSeriesController=async(req,res)=>{
  callService(candleSeriesService,req,res)
}

  module.exports = {candleSeriesController}
