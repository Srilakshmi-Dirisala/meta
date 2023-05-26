const  express  = require("express");
const { getVolumeController } = require("../controller/volume.Controller");
const router = express.Router() ;

router.get('/getVolume/:Network/contract/:Address', getVolumeController)

module.exports=router;