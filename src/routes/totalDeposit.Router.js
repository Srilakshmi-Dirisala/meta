const  express  = require("express");
const { getTotalDepositController } = require("../controller/totalDeposit.Controller");
const router = express.Router() ;

router.get('/getTotalDeposit/:Network/:Address', getTotalDepositController)

module.exports=router;