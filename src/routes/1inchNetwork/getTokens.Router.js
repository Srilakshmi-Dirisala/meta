const  express  = require("express");
const { getTokensController } = require("../../controller/1inchNetwork/getTokens.Controller");
const router = express.Router() ;

router.get('/1inch/getTokens/:chain', getTokensController)

module.exports=router;