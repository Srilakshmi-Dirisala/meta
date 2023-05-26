const { getTokenTradesService } = require('../services/getTokenServices')
const {callService} = require('./callService')


const getTokenTradesController=async(req,res)=>{
  callService(getTokenTradesService,req,res)
}

  module.exports = {getTokenTradesController}



  
   