const { farmingPoolsService } = require('../../services/yieldFarming.Service')
const { callService } = require('../callService')

const farmingPoolsController=async(req,res)=>{
  callService(farmingPoolsService,req,res)
}

  module.exports = {farmingPoolsController}
