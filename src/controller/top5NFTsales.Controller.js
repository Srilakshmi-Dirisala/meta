const {callService} = require('./callService')
const { getTop5NftSalesService } = require('../services/top5NFTsalesService')

const getTop5NFTsalesController=async(req,res)=>{
  callService(getTop5NftSalesService,req,res)
}

  module.exports = {getTop5NFTsalesController}