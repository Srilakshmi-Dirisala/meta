const { getPairDetailsService } = require('../../services/1inchNetwork/pairDetails.Service')
const { callService } = require('../callService')

const getPairDetailsController=async(req,res)=>{
  callService(getPairDetailsService,req,res)
}

  module.exports = {getPairDetailsController}
