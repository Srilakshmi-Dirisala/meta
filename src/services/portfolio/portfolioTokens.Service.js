const { getMethod } = require("../../utilities/methods")
const { unmarshalSupportNetworks, mappingNetworks } = require("../../utilities/networks")
const { getPoolTokensUrl } = require("../../utilities/urls")

const getPortfolioTokensService= async (req, res, next) => {
    try {
      let list = []
      req.query.Address = req.params.Address
      const Address = req.params.Address
      unmarshalSupportNetworks().forEach(network => {
        list.push(getMethod(getPoolTokensUrl(network, Address)))
      })
      const resp = await Promise.all(list)
      let tokens = {}
      unmarshalSupportNetworks().forEach((network, index) => {
        if (resp[index].status) {
          tokens[mappingNetworks(network)] = resp[index].data
        } else {
          tokens[network] = []
        }
      })
  
      const result = Object.keys(tokens).map(i => {
        return tokens[i].map(x => {
          return {
            chain: i,
            icon: x.logo_url,
            address: x.contract_address,
            symbol: x.contract_ticker_symbol,
            bal: parseInt(x.balance) / Math.pow(10, x.contract_decimals),
            value: x.quote,
            priceInUsd: x.quote_rate
          }
        })
      })
      let sum = Object.values(tokens)
        .map(i => {
          return i.reduce((total, x) => {
            return (total += x.quote)
          }, 0)
        })
        .reduce((add, x) => {
          return (add += x)
        }, 0)
        return{
            status:200,
            message:"User Wallet Token Balances",
            data:{ result, TotalValue: sum }
        }
      
    } catch (err) {
        throw new err    }
  }
 module.exports = {getPortfolioTokensService}