const  express  = require("express");
const { getPairDetailsController } = require("../../controller/1inchNetwork/pairDetails.Controller");
const router = express.Router() ;

router.post('/1inch/getPairDetails/:network', getPairDetailsController)

module.exports=router;