const  express  = require("express");
const { getLiquidityInfoController } = require("../controller/liquidity.Controller");


const router = express.Router() ;

router.get('/getChartTokenInfo/:network/:Address', getLiquidityInfoController)


module.exports=router;