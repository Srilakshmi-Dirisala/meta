const { postMethod } = require("../utilities/methods");
const { getBitqueryUrl } = require("../utilities/urls");
const { nftQuery } = require("../utilities/utility");


const getNftTradeService = async (req, res, next) => {
    try {
      const data = await postMethod(getBitqueryUrl(), nftQuery())
      if (!data.status) {
        return {
        status: 400,
        message: data.message,
      };      
      }
      return {
        status: 200,
        message: 'Fetch Nft Trades',
        data:  data.data.data.ethereum,
    }
    
    } catch (err) {
      console.log(err)
    }
  }
  module.exports = { getNftTradeService}