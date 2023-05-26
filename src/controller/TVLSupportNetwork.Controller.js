const {callService} = require('./callService')
const { getSupportNetworksTVLService } = require('../services/TVLSupportNetworkService')


const getSupportNetworksTVLController=async(req,res)=>{
  callService(getSupportNetworksTVLService,req,res)
}

  module.exports = {getSupportNetworksTVLController}