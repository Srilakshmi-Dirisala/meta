const {callService} = require('./callService')
const { getNftFloorPriceService } = require('../services/NFTfloorPriceService')

const getNftFloorPriceController=async(req,res)=>{
  callService(getNftFloorPriceService,req,res)
}

  module.exports = {getNftFloorPriceController}