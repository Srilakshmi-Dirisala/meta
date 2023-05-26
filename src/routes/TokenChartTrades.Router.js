const  express  = require("express");
const { getTokenChartTradesController } = require("../controller/TokenChartTrades.Controller");
const router = express.Router() ;


router.get('/getTokenChartTrades/:network/:Address', getTokenChartTradesController)  //

module.exports=router;