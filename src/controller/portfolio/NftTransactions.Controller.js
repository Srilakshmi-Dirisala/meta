const { getNftTransactionsService } = require('../../services/portfolio/NftTransaction.Service')
const { callService } = require('../callService')

const getNftTransactionsController=async(req,res)=>{
  callService(getNftTransactionsService,req,res)
}

  module.exports = {getNftTransactionsController}