const { getAllChainsService } = require('../../services/portfolio/allChainsService')
const { callService } = require('../callService')

const getAllChainsController=async(req,res)=>{
  callService(getAllChainsService,req,res)
}

  module.exports = {getAllChainsController}