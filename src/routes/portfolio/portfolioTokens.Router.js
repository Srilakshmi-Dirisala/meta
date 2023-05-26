const  express  = require("express");
const { getPortfolioTokensController } = require("../../controller/portfolio/portfolioTokens.Controller");
const router = express.Router() ;

router.get('/getPortfolioTokens/:Address', getPortfolioTokensController)

module.exports=router;