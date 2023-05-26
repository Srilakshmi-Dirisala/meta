const { getPortfolioTokensService } = require('../../services/portfolio/portfolioTokens.Service')
const { callService } = require('../callService')

const getPortfolioTokensController=async(req,res)=>{
  callService(getPortfolioTokensService,req,res)
}

  module.exports = {getPortfolioTokensController}