const  express  = require("express");
const { getPairsController } = require("../../controller/1inchNetwork/getPairs.Controller");
const router = express.Router() ;

router.get('/1inch/getPairs/:network/:token', getPairsController)

module.exports=router;