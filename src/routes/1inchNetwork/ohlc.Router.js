const  express  = require("express");
const { ohlcController } = require("../../controller/1inchNetwork/ohlc.Controller");
const router = express.Router() ;

router.post('/1inch/ohlc/:network', ohlcController)

module.exports=router;