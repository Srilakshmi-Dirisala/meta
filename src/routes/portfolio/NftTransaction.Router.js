const  express  = require("express");
const { getNftTransactionsController } = require("../../controller/portfolio/NftTransactions.Controller");
const router = express.Router() ;

router.get('/getNftTransactions/:network/:Address', getNftTransactionsController)

module.exports=router;