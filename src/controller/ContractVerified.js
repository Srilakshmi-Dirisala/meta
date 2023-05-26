const { getContractVerifiedServices } = require('../services/ContractVerifiedServices')
const {callService} = require('./callService')


const getContractVerifiedController=async(req,res)=>{
  callService(getContractVerifiedServices,req,res)
}

  module.exports = {getContractVerifiedController}