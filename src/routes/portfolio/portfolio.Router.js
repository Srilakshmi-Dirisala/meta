const  express  = require("express");
const { portfolioController } = require("../../controller/portfolio/portfolio.Controller");
const router = express.Router() ;

router.get('/portfolio', portfolioController)


module.exports=router;