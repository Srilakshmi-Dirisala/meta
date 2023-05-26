const  express  = require("express");
const { swapController } = require("../../controller/1inchNetwork/swap.Controller");
const router = express.Router() ;

router.post('/1inch/swap/:chain', swapController)

module.exports=router;