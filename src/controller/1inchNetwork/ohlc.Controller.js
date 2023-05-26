const { ohlcService } = require('../../services/1inchNetwork/ohlc.Service')
const { callService } = require('../callService')

const ohlcController=async(req,res)=>{
  callService(ohlcService,req,res)
}

  module.exports = {ohlcController}
