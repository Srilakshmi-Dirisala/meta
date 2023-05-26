const  express  = require("express");
const { getPorfolioNftsController } = require("../../controller/portfolio/portfolioNfts.Controller");
const router = express.Router() ;

router.get('/getPorfolioNfts', getPorfolioNftsController)

module.exports=router;