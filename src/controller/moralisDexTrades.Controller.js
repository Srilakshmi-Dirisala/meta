const {callService} = require('./callService')
const { moralisDexTradesServices } = require('../services/moralisDexTradesServices')

const moralisDexTradesController=async(req,res)=>{
  callService(moralisDexTradesServices,req,res)
}

  module.exports = {moralisDexTradesController}