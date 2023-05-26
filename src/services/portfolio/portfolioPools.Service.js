const { getMethod } = require("../../utilities/methods")
const { supportNetworks } = require("../../utilities/networks")
const { getFarmUrlForPool } = require("../../utilities/urls")

const getPortfolioPoolsService = async (req, res, next) => {
    try {
      let list = []
      supportNetworks().forEach(network => {
        list.push(getMethod(getFarmUrlForPool(network.name, req.headers.address)))
      })
      const resp = await Promise.all(list)
      let arr = []
      for (i = 0; i < Object.values(resp).length; i++) {
        arr.push(Object.values(resp)[i])
      }
      let result = []
      arr.map(x => {
        if (x.data.platforms && x.data.platforms.length > 0) {
          x.data.platforms.map(x => {
            x.farms.map(i => {
              let reward = i.rewards ? i.rewards[0].usd : 0
              let deposit = i.deposit ? i.deposit.usd : 0
              let yield = i.farm.yield ? i.farm.yield.apy : 0
              let roi = parseInt((deposit * 100) / reward)
              let obj = {
                chain: i.farm.chain,
                id: x.id,
                name: i.farm.name,
                platform: x.label,
                icon: x.icon,
                deposit: deposit,
                currentValue: x.token_price,
                token: x.token,
                currentValue: x.token_price,
                yieldEarned: reward,
                apy: yield,
                PriceRoi: roi,
                Farm_total: x.usd
              }
              result.push(obj)
            })
          })
        }
      })
      let totalStaked = 0
      arr.map(x => {
        if (x.data.platforms && x.data.platforms.length > 0) {
          x.data.platforms.map(i => {
            totalStaked = totalStaked + i.usd
          })
        }
      })
      let totalPending = result.reduce((pending, x) => {
        return (pending += x.yieldEarned)
      }, 0)
      // console.log(totalPending)
      return{
        status:200,
        message:"User Wallet Pool Tokens",
        data: { result: result, totalStaked: totalStaked, totalPending: totalPending }
      }
     
    } catch (err) {
throw new err    }
  }

  module.exports = {getPortfolioPoolsService}