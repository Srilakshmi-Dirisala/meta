const { getMethodWithHeaders } = require("../../utilities/methods")
const { topMarketsUrl } = require("../../utilities/urls")

const getTopMarketsService = async () => {
    try {
      const data = await getMethodWithHeaders(topMarketsUrl())
      if (!data.status) {
        return{
            status:400,
            message:"Failed",
            
        }
      }
      const resp = data.data.results.map(x => {
        return {
          name: x.name,
          logo: x.logo,
          link: x.link,
          volume: x.volume,
          volume_change: x.volume_change,
          traders: x.traders,
          traders_change: x.traders_change
        }
      })
      return{
        status:200,
        message:"Fetch Top NFT Markets",
        data:resp
      }
    } catch (err) {
    throw new err    }
  }
  module.exports = {getTopMarketsService}