const  express  = require("express");
const { getAllProtocolsController } = require("../controller/protocols.Controller");
const router = express.Router() ;

router.get('/getAllProtocols', getAllProtocolsController)

module.exports=router;