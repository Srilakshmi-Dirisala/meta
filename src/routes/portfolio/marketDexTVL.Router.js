const  express  = require("express");
const { getMarketDexTvlController } = require("../../controller/portfolio/marketDexTVL.Controller");
const router = express.Router() ;

router.get('/getMarketDexTvl/:NetworkOrCoin', getMarketDexTvlController)

module.exports=router;