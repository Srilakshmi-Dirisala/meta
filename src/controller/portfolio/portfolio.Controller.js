const { portfolioService } = require('../../services/portfolio/portfolioService')
const { callService } = require('../callService')

const portfolioController=async(req,res)=>{
  callService(portfolioService,req,res)
}

  module.exports = {portfolioController}