const { getPorfolioNftsService } = require('../../services/portfolio/portfolioNfts.Service')
const { callService } = require('../callService')

const getPorfolioNftsController=async(req,res)=>{
  callService(getPorfolioNftsService,req,res)
}

  module.exports = {getPorfolioNftsController}