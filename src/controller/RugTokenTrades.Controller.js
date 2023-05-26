const {callService} = require('./callService')
const { getRugTokenDetailsServices } = require('../services/RugTokenDetailsServices')


const getRugTokenDetailsController=async(req,res)=>{
  callService(getRugTokenDetailsServices,req,res)
}

  module.exports = {getRugTokenDetailsController}