const {callService} = require('./callService')
const { getNftTradeService } = require('../services/NFTtradesService')

const getNFTtradeController=async(req,res)=>{
  callService(getNftTradeService,req,res)
}

  module.exports = {getNFTtradeController}