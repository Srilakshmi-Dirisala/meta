const  express  = require("express");
const { getTop5NFTsalesController } = require("../controller/top5NFTsales.Controller");
const router = express.Router() ;

router.get('/getTop5NftSales', getTop5NFTsalesController)


module.exports=router;