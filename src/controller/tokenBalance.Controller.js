const {callService} = require('./callService')
const { getgetTokenBalanceService } = require('../services/tokenBalanceService')


const getgetTokenBalanceController=async(req,res)=>{
  callService(getgetTokenBalanceService,req,res)
}

  module.exports = {getgetTokenBalanceController}