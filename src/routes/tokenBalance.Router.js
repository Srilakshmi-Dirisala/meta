const  express  = require("express");
const { getgetTokenBalanceController } = require("../controller/tokenBalance.Controller");
const router = express.Router() ;


router.get('/getTokenBalance/:Network/address/:Address/assets', getgetTokenBalanceController)

module.exports=router;