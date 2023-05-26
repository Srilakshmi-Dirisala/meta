const  express  = require("express");
const { searchTokenController } = require("../../controller/1inchNetwork/serachToken.Controller");
const router = express.Router() ;

router.get('/1inch/searchToken/:network/:name', searchTokenController)

module.exports=router;