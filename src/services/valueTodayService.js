const { getMethod } = require("../../utilities/methods")
const { getPoolTokensUrl } = require("../../utilities/urls")

const getValueTodayService = async (req, res, next) => {
    req.query.Network = req.params.Network
    req.query.Address = req.params.Address
    const Network = req.params.Network
    // const Address = req.params.Address
    const data = await getMethod(getPoolTokensUrl(Network, req.headers.address))
    if (!data.status) {
      return {
        status: 500,
        message: data.message,
      };
    }
  
    let sumOfValue = 0
    data.data.map(x => {
      sumOfValue = sumOfValue + x.quote_rate
    })
    return {
      status: 200,
      message: 'Fetch token value',
      data:  { ValueToday: sumOfValue, data: data.data },

    };
  }

  module.exports = {getValueTodayService}
  