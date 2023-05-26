const  express  = require("express");
const {  getRugTokenDetailsController } = require("../controller/RugTokenTrades.Controller");
const router = express.Router() ;


router.get('/getRugTokenDetails/:network/:Address', getRugTokenDetailsController)

module.exports=router;