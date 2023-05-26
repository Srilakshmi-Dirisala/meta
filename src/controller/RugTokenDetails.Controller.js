const {callService} = require('./callService')
const { getRugTokenTradesServices } = require('../services/RugTokenTradesServices')


const getRugTokenTradesController=async(req,res)=>{
  callService(getRugTokenTradesServices,req,res)
}

  module.exports = {getRugTokenTradesController}