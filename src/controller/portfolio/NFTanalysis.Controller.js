const { nftAnalysisService } = require('../../services/portfolio/NFTanalysis.Service')
const { callService } = require('../callService')

const nftAnalysisController=async(req,res)=>{
  callService(nftAnalysisService,req,res)
}

  module.exports = {nftAnalysisController}