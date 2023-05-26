const  express  = require("express");
const { getTopNFTsalesController } = require("../controller/topNFTsales.Controller");
const router = express.Router() ;

router.get('/getTopNftSales/:network', getTopNFTsalesController)

module.exports=router;