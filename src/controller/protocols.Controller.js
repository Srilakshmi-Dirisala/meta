const {callService} = require('./callService')
const { getAllProtocolsService } = require('../services/protocolsService')


const getAllProtocolsController=async(req,res)=>{
  callService(getAllProtocolsService,req,res)
}

  module.exports = {getAllProtocolsController}