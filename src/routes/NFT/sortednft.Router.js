const  express  = require("express");
const { sortedNftsController } = require("../../controller/NFT/sortednft.Controller");


const router = express.Router() ;

router.get('/sortedNfts/:address/:sortType/:page', sortedNftsController)


module.exports=router;