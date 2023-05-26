const  express  = require("express");
const { getNftsController } = require("../../controller/portfolio/getNft.Controller");
const router = express.Router() ;

router.get('/getNfts/:Address', getNftsController)

module.exports=router;