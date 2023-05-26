const  express  = require("express");
const { getRugTokenTradesController } = require("../controller/RugTokenDetails.Controller");
const router = express.Router() ;


router.get('/getRugTokenTrades/:network/:Address', getRugTokenTradesController)

module.exports=router;