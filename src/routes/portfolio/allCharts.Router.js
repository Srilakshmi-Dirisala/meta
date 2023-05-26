const  express  = require("express");
const { getAllChartsController } = require("../../controller/portfolio/allCharts.Controller");
const router = express.Router() ;

router.get('/getAllCharts/:NetworkOrCoin', getAllChartsController)

module.exports=router;