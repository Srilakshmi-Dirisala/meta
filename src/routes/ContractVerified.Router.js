const  express  = require("express");
const { getContractVerifiedController } = require("../controller/ContractVerified");


const router = express.Router() ;

router.get('/getContractVerified/:network/:Address', getContractVerifiedController)


module.exports=router;