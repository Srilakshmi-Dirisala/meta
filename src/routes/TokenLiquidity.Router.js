const  express  = require("express");
const { getTokenLiquidityController } = require("../controller/TokenLiquidityServices");
const router = express.Router() ;


router.get('/getTokenLiquidity/:network/:Address', getTokenLiquidityController)

module.exports=router;