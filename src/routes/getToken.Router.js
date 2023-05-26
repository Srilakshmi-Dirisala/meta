const  express  = require("express");
const { getTokenTradesController } = require("../controller/tokenTrades.controller");

const router = express.Router() ;

router.get('/getTokenTrades/:network/:pairAddress', getTokenTradesController)


module.exports=router;