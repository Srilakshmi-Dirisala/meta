const { postMethod } = require("../../utilities/methods");
const { getBitqueryUrl } = require("../../utilities/urls");
const { Trade24hAmountQuery } = require("../../utilities/utility")

const getTrade24hAmountService = async (req, res, next) => {
    try {
      const data = await postMethod(getBitqueryUrl(), Trade24hAmountQuery())
      if (!data.status) {
        return {
            status: 400,
            message: data.message,
          };      
      }
      return{
        status:200,
        message:"'Fetch Trades of 24hrs'",
        data:data.data.data.ethereum,
      }
     
    } catch (err) {
      console.log(err)
    }
  }

  module.exports = {getTrade24hAmountService}