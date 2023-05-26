const  express  = require("express");
const { getArrivalTimeController } = require("../../controller/portfolio/arrivalTime.Controller");
const router = express.Router() ;

router.get('/getArrivalTime/:NetworkOrCoin', getArrivalTimeController)

module.exports=router;