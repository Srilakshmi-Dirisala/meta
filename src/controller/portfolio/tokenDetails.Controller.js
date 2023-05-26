const { getTokenDetailsService } = require('../../services/portfolio/tokenDetails.Service')
const { callService } = require('../callService')

const getTokenDetailsController=async(req,res)=>{
  callService(getTokenDetailsService,req,res)
}

  module.exports = {getTokenDetailsController}