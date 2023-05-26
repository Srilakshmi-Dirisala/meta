const  express  = require("express");
const { getTrade24hAmountController } = require("../controller/trade24hAmount.Controller");
const router = express.Router() ;

router.get('/getTrade24hAmount', getTrade24hAmountController)

module.exports=router;