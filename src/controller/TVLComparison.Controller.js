const {callService} = require('./callService')
const { getTVLComparisonService } = require('../services/TVLComparisonService')

const getTVLComparisonController=async(req,res)=>{
  callService(getTVLComparisonService,req,res)
}

  module.exports = {getTVLComparisonController}