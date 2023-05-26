const { getNftsService } = require('../../services/portfolio/getNft.Service')
const { callService } = require('../callService')

const getNftsController=async(req,res)=>{
  callService(getNftsService,req,res)
}

  module.exports = {getNftsController}