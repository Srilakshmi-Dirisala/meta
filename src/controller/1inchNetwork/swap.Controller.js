const { swapService } = require('../../services/1inchNetwork/swap.Service')
const { callService } = require('../callService')

const swapController=async(req,res)=>{
  callService(swapService,req,res)
}

  module.exports = {swapController}
