const { getPortfolioPoolsService } = require('../../services/portfolio/portfolioPools.Service')
const { callService } = require('../callService')

const getPortfolioPoolsController=async(req,res)=>{
  callService(getPortfolioPoolsService,req,res)
}

  module.exports = {getPortfolioPoolsController}