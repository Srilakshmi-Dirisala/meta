const { getTopMarketsService } = require('../../services/portfolio/topMarkets.Service')
const { callService } = require('../callService')

const getTopMarketsController=async(req,res)=>{
  callService(getTopMarketsService,req,res)
}

  module.exports = {getTopMarketsController}