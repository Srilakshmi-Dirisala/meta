const { getUserPoolsWithYieldService } = require('../../services/portfolio/userPoolsWithYield.Service')
const { callService } = require('../callService')

const getUserPoolsWithYieldController=async(req,res)=>{
  callService(getUserPoolsWithYieldService,req,res)
}

  module.exports = {getUserPoolsWithYieldController}
