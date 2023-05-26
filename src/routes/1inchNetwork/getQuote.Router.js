const  express  = require("express");
const { getQuoteController } = require("../../controller/1inchNetwork/getQuote.Controller");
const router = express.Router() ;

router.post('/1inch/getQuote/:chain', getQuoteController)

module.exports=router;