const  express  = require("express");
const { getTopMarketsController } = require("../../controller/portfolio/topMarkets.Controller");
const router = express.Router() ;

router.get('/getTopMarkets', getTopMarketsController)

module.exports=router;