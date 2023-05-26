const { getAllChartsService } = require('../../services/portfolio/allChartsService')
const { callService } = require('../callService')

const getAllChartsController=async(req,res)=>{
  callService(getAllChartsService,req,res)
}

  module.exports = {getAllChartsController}