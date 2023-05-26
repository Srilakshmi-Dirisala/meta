const {callService} = require('./callService')
const { getVolumeService } = require('../services/volumeService')

const getVolumeController=async(req,res)=>{
  callService(getVolumeService,req,res)
}

  module.exports = {getVolumeController}