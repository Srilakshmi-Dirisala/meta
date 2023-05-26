const { nftRarityServices } = require('../../services/NFT/nftRarityServices')
const {callService} = require('../callService')


const nftRarityController=async(req,res)=>{
  callService( nftRarityServices,req,res)
}

  module.exports = {nftRarityController}