const  express  = require("express");
const { getNftFloorPriceController } = require("../controller/NFTfloorPrice.Controller");
const router = express.Router() ;

router.get('/getNftFloorPrice/:id', getNftFloorPriceController)

module.exports=router;