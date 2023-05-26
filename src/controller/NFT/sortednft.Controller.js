const {callService} = require('./callService')


const  sortedNftsController=async(req,res)=>{
  callService( sortedNftsServices,req,res)
}

  module.exports = { sortedNftsController}