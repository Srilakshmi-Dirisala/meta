const {  getNetworkTxnCountService } = require('../../services/portfolio/networkTxnCount.Service')
const { callService } = require('../callService')

const getNetworkTxnCountController=async(req,res)=>{
  callService(getNetworkTxnCountService,req,res)
}

  module.exports = {getNetworkTxnCountController}
