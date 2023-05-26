const {callService} = require('./callService')


const getLiquidityInfoController=async(req,res)=>{
  callService(getLiquidityInfoServices,req,res)
}

  module.exports = {getLiquidityInfoController}