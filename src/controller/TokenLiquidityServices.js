const { getTokenLiquidityServices } = require('../services/TokenLiquidityServices')
const {callService} = require('./callService')



const getTokenLiquidityController=async(req,res)=>{
  callService(getTokenLiquidityServices,req,res)
}

  module.exports = {getTokenLiquidityController}