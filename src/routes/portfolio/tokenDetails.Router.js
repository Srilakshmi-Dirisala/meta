const  express  = require("express");
const { getTokenDetailsController } = require("../../controller/portfolio/tokenDetails.Controller");
const router = express.Router() ;

router.get('/getTokenDetails/:network/:Address', getTokenDetailsController)

module.exports=router;