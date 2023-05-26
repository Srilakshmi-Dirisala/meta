const  express  = require("express");
const { getTVLComparisonController } = require("../controller/TVLComparison.Controller");
const router = express.Router() ;

router.get('/getTVLComparison', getTVLComparisonController)

module.exports=router;