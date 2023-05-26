const {callService} = require('./callService')
const { getLiquidityInfoServices } = require('../services/liquidityServices')

const getLiquidityInfoController=async(req,res)=>{
  callService(getLiquidityInfoServices,req,res)
}

  module.exports = {getLiquidityInfoController}