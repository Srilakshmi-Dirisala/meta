const { getTokenPairInfoServices } = require('../services/TokenPairInfoService')
const {callService} = require('./callService')



const getTokenPairInfoController=async(req,res)=>{
  callService(getTokenPairInfoServices,req,res)
}

  module.exports = {getTokenPairInfoController}