const { nftRarityServices } = require('../../services/NFT/nftRarityServices')
const { storeCollectionNftsServices } = require('../../services/NFT/storeCollectionNftsServices')
const {callService} = require('../callService')


const storeCollectionNftsController=async(req,res)=>{
  callService( storeCollectionNftsServices,req,res)
}

  module.exports = {storeCollectionNftsController}