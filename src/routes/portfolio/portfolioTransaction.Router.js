const  express  = require("express");
const { getPortfolioTransactionController } = require("../../controller/portfolio/portfolioTransaction.Controller");
const router = express.Router() ;

router.get('/getPortfolioTransaction/:NetworkOrCoin/:page', getPortfolioTransactionController)

module.exports=router;