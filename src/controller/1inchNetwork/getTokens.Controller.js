const { getTokensService } = require('../../services/1inchNetwork/getTokens.Service')
const { callService } = require('../callService')

const getTokensController=async(req,res)=>{
  callService(getTokensService,req,res)
}

  module.exports = {getTokensController}
