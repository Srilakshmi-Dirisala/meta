const  express  = require("express");
const { getPortfolioPoolsController } = require("../../controller/portfolio/portfolioPools.Controller");
const router = express.Router() ;

router.get('/getPortfolioPools', getPortfolioPoolsController)

module.exports=router;