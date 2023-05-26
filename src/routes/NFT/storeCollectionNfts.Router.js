const  express  = require("express");
const { storeCollectionNftsController } = require("../../controller/NFT/storeCollectionNfts.Controller");


const router = express.Router() ;

router.get('/storeCollectionNfts/:collection', storeCollectionNftsController)


module.exports=router;