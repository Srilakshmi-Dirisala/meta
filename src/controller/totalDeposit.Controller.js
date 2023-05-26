const {callService} = require('./callService')
const { getTotalDepositService } = require('../services/totalDepositService')

const getTotalDepositController=async(req,res)=>{
  callService(getTotalDepositService,req,res)
}

  module.exports = {getTotalDepositController}