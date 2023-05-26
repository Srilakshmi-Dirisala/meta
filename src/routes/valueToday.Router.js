const  express  = require("express");
const { getValueTodayController } = require("../controller/valueToday.Controller");
const router = express.Router() ;

router.get('/getValueToday/:Network', getValueTodayController)

module.exports=router;