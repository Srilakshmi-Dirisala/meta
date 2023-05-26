const  express  = require("express");
const { getNetworkTxnCountController } = require("../../controller/portfolio/networkTxnCount.Controller");
const router = express.Router() ;

router.get('/getNetworkTxCount/:network', getNetworkTxnCountController)

module.exports=router;