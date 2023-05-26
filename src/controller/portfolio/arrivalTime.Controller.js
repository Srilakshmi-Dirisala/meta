const { getArrivalTimeService } = require('../../services/portfolio/arrivalTimeService')
const { callService } = require('../callService')

const getArrivalTimeController=async(req,res)=>{
  callService(getArrivalTimeService,req,res)
}

  module.exports = {getArrivalTimeController}