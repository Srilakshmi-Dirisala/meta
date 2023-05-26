const  express  = require("express");
const { nftAnalysisController } = require("../../controller/portfolio/NFTanalysis.Controller");
const router = express.Router() ;

router.get('/nftAnalysis/:type', nftAnalysisController)

module.exports=router;