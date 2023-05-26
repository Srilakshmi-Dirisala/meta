const { getTokenChartTradesServices } = require('../services/TokenChartTradesServices')

const {callService} = require('./callService')



const getTokenChartTradesController=async(req,res)=>{
  callService(getTokenChartTradesServices,req,res)
}

  module.exports = {getTokenChartTradesController}