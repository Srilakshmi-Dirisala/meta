const  express  = require("express");
const { getMarketCapitalizationController } = require("../../controller/portfolio/marketCapitalization.Controller");
const router = express.Router() ;

router.get('/getMarketCapitalization/:NetworkOrCoin', getMarketCapitalizationController)


module.exports=router;