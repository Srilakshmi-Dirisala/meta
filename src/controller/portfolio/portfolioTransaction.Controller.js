const { getPortfolioTransactionService } = require('../../services/portfolio/portfolioTransaction.service')
const { callService } = require('../callService')

const getPortfolioTransactionController=async(req,res)=>{
  callService(getPortfolioTransactionService,req,res)
}

  module.exports = {getPortfolioTransactionController}