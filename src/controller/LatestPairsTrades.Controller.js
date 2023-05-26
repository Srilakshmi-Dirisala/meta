
const { getLiquidityInfoServices } = require('../services/liquidityServices')
const {callService} = require('./callService')


const getLatestPairsTradesController=async(req,res)=>{
  callService(getLiquidityInfoServices,req,res)
}

  module.exports = {getLatestPairsTradesController}