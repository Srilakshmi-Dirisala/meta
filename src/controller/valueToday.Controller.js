const {callService} = require('./callService')
const { getValueTodayService } = require('../services/valueTodayService')

const getValueTodayController=async(req,res)=>{
  callService(getValueTodayService,req,res)
}

  module.exports = {getValueTodayController}