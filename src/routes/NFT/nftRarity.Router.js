const  express  = require("express");
const { nftRarityController } = require("../../controller/NFT/nftRarity.Controller");


const router = express.Router() ;

router.get('/nftRarity/:name', nftRarityController)


module.exports=router;