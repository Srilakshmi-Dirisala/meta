const { getMethod } = require("../../../utilities/methods")
const { supportNetworks } = require("../../../utilities/networks")
const { getFarmUrl } = require("../../../utilities/urls")


const getArrivalTimeService = async (req, res, next) => {
    try {
      req.params.NetworkOrCoin = req.params.NetworkOrCoin || 'all'
  
      if (
        !supportNetworks().find(
          x => x.name.toLowerCase() === req.params.NetworkOrCoin.toLowerCase()
        )
      ) {
        req.params.NetworkOrCoin = 'all'
      }
      const NetworkOrCoin = req.params.NetworkOrCoin
        ? req.params.NetworkOrCoin.toLowerCase() === 'all'
          ? ''
          : req.params.NetworkOrCoin
        : ''
      if (NetworkOrCoin) {
        let list = []
        let DataChain = supportNetworks().find(
          x => x.name.toLowerCase() === NetworkOrCoin.toLowerCase()
        )
        if (DataChain.name.toLocaleLowerCase() !== 'ethereum') {
          const data = await getMethodd(
            getFarmUrl(DataChain.name.toLocaleLowerCase())
          )
          if (data.data) {
            data.data = data.data.slice(0, 10)
            list = data.data.map(x => {
              return {
                id: x.id,
                name: x.name,
                platform: x.platform,
                icon: x.icon,
                tvl: x.tvl,
                yield: x.yield,
                chain: DataChain.name,
                data: x
              }
            })
          }
        }
        return{
            status:200,
            message:'Fetch Arrival Time',
            data:list
        }
      } else {
        let chains = []
        const networks = supportNetworks().filter(
          x =>
            x.name.toLocaleLowerCase() !== 'all' &&
            x.name.toLocaleLowerCase() !== 'ethereum'
        )
        networks.forEach(network => {
          chains.push(getMethod(getFarmUrl(network.name)))
        })
        const data = await Promise.all(chains)
        let resp = []
        networks.forEach((network, index) => {
          // console.log(data[index])
          data[index].data = data[index].data.slice(0, 5)
          let tempResp = data[index].data.map(list => {
            return {
              id: list.id,
              name: list.name,
              platform: list.platform,
              icon: list.icon,
              tvl: list.tvl,
              yield: list.yield,
              chain: network.name
            }
          })
          resp = resp.concat(tempResp)
        })
        return{
            status:200,
            message:'Fetch Arrival Time',
            data:resp
        }
      }
    } catch (err) {
    throw new err    }
  }

  module.exports = {getArrivalTimeService}