const {callService} = require('./callService')
const { getPoolDataService } = require('../services/poolDataService')

const getPoolDataController=async(req,res)=>{
  callService(getPoolDataService,req,res)
}

  module.exports = {getPoolDataController}