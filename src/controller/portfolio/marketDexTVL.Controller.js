const { getMarketDexTvlService } = require('../../services/portfolio/marketDexTVLservice')
const { callService } = require('../callService')

const getMarketDexTvlController=async(req,res)=>{
  callService(getMarketDexTvlService,req,res)
}

  module.exports = {getMarketDexTvlController}