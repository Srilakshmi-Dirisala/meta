const {callService} = require('./callService')
const { getNftSalesService } = require('../services/NFTsalesService')

const getNFTSalesController=async(req,res)=>{
  callService(getNftSalesService,req,res)
}

  module.exports = {getNFTSalesController}