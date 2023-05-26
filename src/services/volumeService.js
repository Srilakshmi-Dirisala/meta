const { getMethod } = require("../utilities/methods")
const { getVolumeUrl } = require("../utilities/urls")


const getVolumeService = async (req, res, next) => {
    req.query.Network = req.params.Network
    req.query.Address = req.params.Address
    const Network = req.params.Network
    const Address = req.params.Address
    const data = await getMethod(getVolumeUrl(Network, Address))
    if (!data.status) {
      return{status:500, message:"Failed ",data:[]}
    }
    // console.log("data.data",data.data)
    return {
      status: 200,
      message: 'Fetch Volume',
      data:  { Volume: data.data },
  }
}
  module.exports = {getVolumeService}