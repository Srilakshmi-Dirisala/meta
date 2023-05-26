const  express  = require("express");
const { getUserNftsController } = require("../../controller/portfolio/userNft.Controller");
const router = express.Router() ;

router.get('/getUserNfts/:Address', getUserNftsController)

module.exports=router;