const { getMethod } = require("../utilities/methods");
const { getPoolDataUrl } = require("../utilities/urls");


const getPoolDataService = async (req, res, next) => {
    try {
      req.query.Address = req.params.Address
      const Address = req.params.Address
      const data = await getMethod(getPoolDataUrl(Address))
      if (!data.status) {
        return {
            status: 400,
            message: data.message,
          };  
      }
      return {
        status: 200,
        message: 'Fetch Pool Data',
        data:data.data
      };  
    } catch (err) {
      console.log(err)
    }
  }

  module.exports = {getPoolDataService}