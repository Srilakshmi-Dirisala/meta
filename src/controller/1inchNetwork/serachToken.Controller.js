const { searchTokenService } = require('../../services/1inchNetwork/serachToken.Service')
const { callService } = require('../callService')

const searchTokenController=async(req,res)=>{
  callService(searchTokenService,req,res)
}

  module.exports = {searchTokenController}
