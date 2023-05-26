const { getMethod } = require("../../utilities/methods")
const { supportNetworks } = require("../../utilities/networks")
const { getAllProtocolsUrl } = require("../../utilities/urls")
const { dataSort } = require("../../utilities/utility")

const getAllProtocolsService = async () => {
    try {
      const data = await getMethod(getAllProtocolsUrl())
      if (!data.status) {
       return{status: 200, message: "protocols", data: [] }   
      }
      //data.data = data.data.filter(x => x.chains.find(z => z.includes('Karura')))
      data.data = dataSort(data.data, 'tvl')
      // const chains = getChains(data.data || [])
      const chains = supportNetworks()
      return{status: 200, message: "networks", data: chains }
  
      // res.json({ ...data, chains, status: true });
    } catch (err) {
        console.log(err)
        return {status: 400, data:[],message:err.message}
     }
  }
  
  module.exports = {getAllProtocolsService}