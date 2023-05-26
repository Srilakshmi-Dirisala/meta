const  express  = require("express");
const { getCollectionInfoController } = require("../../controller/NFT/CollectionInfo.Controller");


const router = express.Router() ;

router.get('/getCollectionInfo/:slug', getCollectionInfoController)


module.exports=router;