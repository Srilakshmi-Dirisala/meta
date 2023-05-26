const  express  = require("express");
const { getNFTSalesController } = require("../controller/NFTsales.Controller");
const router = express.Router() ;

router.get('/getNftSales', getNFTSalesController)

module.exports=router;