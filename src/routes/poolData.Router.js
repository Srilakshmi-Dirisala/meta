const  express  = require("express");
const { getPoolDataController } = require("../controller/poolData.Controller");
const router = express.Router() ;

router.get('/getPoolData/:Address', getPoolDataController)

module.exports=router;