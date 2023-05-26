const  express  = require("express");
const { farmingPoolsController } = require("../../controller/yieldFarming/yieldFarming.Controller");
const router = express.Router() ;

router.get('/farmingPools/:NetworkOrCoin', farmingPoolsController)

module.exports=router;