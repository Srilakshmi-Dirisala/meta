const { getCollectionInfoServices } = require('../../services/NFT/CollectionInfoServices')
const {callService} = require('../callService')


const  getCollectionInfoController=async(req,res)=>{
  callService( getCollectionInfoServices,req,res)
}

  module.exports = { getCollectionInfoController}