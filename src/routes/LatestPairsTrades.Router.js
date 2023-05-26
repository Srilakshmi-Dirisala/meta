const  express  = require("express");
const { getLatestPairsTradesController } = require("../controller/LatestPairsTrades.Controller");


const router = express.Router() ;

router.get('/getLatestPairsTrades/:network/:tokenAddress/:pairAddress', getLatestPairsTradesController)


module.exports=router;