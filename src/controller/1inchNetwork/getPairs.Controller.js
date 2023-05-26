const { getPairsService } = require('../../services/1inchNetwork/getPairs.Service')
const { callService } = require('../callService')

const getPairsController=async(req,res)=>{
  callService(getPairsService,req,res)
}

  module.exports = {getPairsController}
