const { getUserNftsService } = require('../../services/portfolio/userNft.Service')
const { callService } = require('../callService')

const getUserNftsController=async(req,res)=>{
  callService(getUserNftsService,req,res)
}

  module.exports = {getUserNftsController}
