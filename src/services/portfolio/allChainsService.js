const { supportNetworks } = require("../../utilities/networks")


const getAllChainsService = async () => {
    try {
        return{
            sttaus:200,
            message:'get All Chains',
            data:supportNetworks()
        }
    } catch (err) {
          throw new err
    }
  }

  module.exports = {getAllChainsService}