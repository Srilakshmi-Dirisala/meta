const { getTransactionsDexService } = require('../../services/1inchNetwork/transactionDex.Service')
const { callService } = require('../callService')

const getTransactionsDexController=async(req,res)=>{
  callService(getTransactionsDexService,req,res)
}

  module.exports = {getTransactionsDexController}
