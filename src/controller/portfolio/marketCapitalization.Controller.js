const {  getMarketCapitalizationService } = require('../../services/portfolio/marketCapitalizationService')
const { callService } = require('../callService')

const getMarketCapitalizationController=async(req,res)=>{
  callService(getMarketCapitalizationService,req,res)
}

  module.exports = {getMarketCapitalizationController}