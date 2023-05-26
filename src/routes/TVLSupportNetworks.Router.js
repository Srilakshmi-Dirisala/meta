const  express  = require("express");
const { getSupportNetworksTVLController } = require("../controller/TVLSupportNetwork.Controller");
const router = express.Router() ;

router.get('/getSupportNetworksTVL', getSupportNetworksTVLController)

module.exports=router;