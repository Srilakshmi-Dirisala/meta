const { getQuoteService } = require('../../services/1inchNetwork/getQuote.Service')
const { callService } = require('../callService')

const getQuoteController=async(req,res)=>{
  callService(getQuoteService,req,res)
}

  module.exports = {getQuoteController}
