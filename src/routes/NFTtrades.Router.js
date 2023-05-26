const  express  = require("express");
const { getNFTtradeController } = require("../controller/NFTtrades.Controller");
const router = express.Router() ;

router.get('/getNFTtrades', getNFTtradeController)

module.exports=router;