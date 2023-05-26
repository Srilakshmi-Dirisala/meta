const { getMethod } = require("../../utilities/methods")
const { getTotalDepositUrl } = require("../../utilities/urls")
const { totalDepositData } = require("../../utilities/utility")

const getTotalDepositService = async (req, res, next) => {
    req.query.Address = req.params.Address
    const Address = req.params.Address
    const Network = req.params.Network
    const data = await getMethod(getTotalDepositUrl(Network, Address))
    const deposit = await totalDepositData(data)
    if (!data.status) {
        return {
            status: 400,
            message: data.message,
          };      
    }

    return {
        status: 200,
        message: 'Fetch total deposit',
        data: { TotalDeposit: deposit, transactionsData: data.data.transactions },
    }

  }

  module.exports = {getTotalDepositService}