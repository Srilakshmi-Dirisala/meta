const  express  = require("express");
const { moralisDexTradesController } = require("../controller/moralisDexTrades.Controller");
const router = express.Router() ;

router.get('/moralisDexTrades/:network/:Address', moralisDexTradesController)

module.exports=router;