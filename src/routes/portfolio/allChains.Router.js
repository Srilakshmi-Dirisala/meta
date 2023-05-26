const  express  = require("express");
const { getAllChainsController } = require("../../controller/portfolio/allChains.Controller");
const router = express.Router() ;

router.get('/getAllChains', getAllChainsController)


module.exports=router;