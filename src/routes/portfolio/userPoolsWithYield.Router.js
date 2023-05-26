const  express  = require("express");
const { getUserPoolsWithYieldController } = require("../../controller/portfolio/userPoolsWithYield.Controller");
const router = express.Router() ;

router.get('/getUserPoolsWithYield', getUserPoolsWithYieldController)

module.exports=router;