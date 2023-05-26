const {callService} = require('./callService')
const { getTopNftSalesService } = require('../services/topNFTsalesService')

const getTopNFTsalesController=async(req,res)=>{
  callService(getTopNftSalesService,req,res)
}

  module.exports = {getTopNFTsalesController}