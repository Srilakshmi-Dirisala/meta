const  express  = require("express");
const { getLiquidityInfoController } = require("../controller/liquidity.Controller");


const router = express.Router() ;

router.get('/getLiquidityInfo/:network/:pairAddress/:tokenA/:tokenB', getLiquidityInfoController)//


module.exports=router;