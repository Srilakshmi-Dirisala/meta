const  express  = require("express");
const { candleSeriesController } = require("../../controller/1inchNetwork/candleSeries.Controller");
const router = express.Router() ;

router.post('/1inch/candleSeries/:chain', candleSeriesController)

module.exports=router;