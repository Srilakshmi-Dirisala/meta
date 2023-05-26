const  express  = require("express");
const { getTokenPairInfoController } = require("../controller/TokenPairinfo");
const router = express.Router() ;


router.get('/getTokenPairInfo/:network/:tokenNameOrAddress', getTokenPairInfoController)

module.exports=router;