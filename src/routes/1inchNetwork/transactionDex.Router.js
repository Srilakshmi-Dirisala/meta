const  express  = require("express");
const { getTransactionsDexController } = require("../../controller/1inchNetwork/transactionDex.Controller");
const router = express.Router() ;

router.post('/1inch/getTransactionsDex/:network', getTransactionsDexController)

module.exports=router;