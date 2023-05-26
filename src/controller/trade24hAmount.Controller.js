const {callService} = require('./callService')
const { getTrade24hAmountService } = require('../services/trade24hAmountService')

const getTrade24hAmountController=async(req,res)=>{
  callService(getTrade24hAmountService,req,res)
}

  module.exports = {getTrade24hAmountController}