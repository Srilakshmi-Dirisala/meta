const { getMethod, postMethod } = require("../utilities/methods")
const { coingeckoSupportNetworks, mappingBitQueryFields } = require("../utilities/networks")
const { getTokenInfoUrl, getRugTokenPrice, getRugTokenTotalSupply, getBitqueryUrl, getBurnedTokensUrl } = require("../utilities/urls")
const { bitQueryDex } = require("../utilities/utility")

module.exports.getRugTokenDetailsServices = async (req) => {
    try {
      const network = req.params.network
      const Address = req.params.Address
      if (network && Address) {
        const chain = coingeckoSupportNetworks(network)
        const Network = mappingBitQueryFields(network)
        let query = getTokenInfoUrl(Network, Address)
        let tokenObj = {}
        const tokenData = await Promise.all([
          getMethod(getRugTokenPrice(chain, Address)),
          getMethod(getRugTokenTotalSupply(network, Address)),
          postMethod(getBitqueryUrl(), query),
          postMethod(getBitqueryUrl(), getBurnedTokensUrl(Network, Address))
        ])
  
        const data = bitQueryDex(tokenData[3])
        tokenData.forEach((x, index) => {
          if (x.status) {
            if (index == 0 && tokenData[index] && tokenData[index].data) {
              let info = tokenData[index].data
              Object.values(info).map(x => {
                tokenObj.priceUSD = x.usd
                tokenObj.marketCap = x.usd_market_cap
                tokenObj.usd_24h_vol = x.usd_24h_vol
                tokenObj.usd_24h_change = x.usd_24h_change
                tokenObj.last_updated_at = x.last_updated_at
              })
            }
            if (
              index == 1 &&
              tokenData[index] &&
              tokenData[index].data &&
              tokenData[index].status
            ) {
              tokenObj.totalSupply = parseInt(tokenData[index].data.result) / 1e18
            }
            if (
              index == 2 &&
              tokenData[index] &&
              tokenData[index].status &&
              tokenData[index].data &&
              tokenData[index].data.data &&
              tokenData[index].data.data.ethereum &&
              tokenData[index].data.data.ethereum.address.length != 0 &&
              tokenData[index].data.data.ethereum.transactions.length != 0
            ) {
              tokenObj.address =
                tokenData[index].data.data.ethereum.address[0].address
              tokenObj.balance =
                tokenData[index].data.data.ethereum.address[0].balance
              tokenObj.name =
                tokenData[index].data.data.ethereum.address[0].annotation
              tokenObj.txCount =
                tokenData[index].data.data.ethereum.transactions[0].TxCount
              tokenObj.TxAmountInUSD =
                tokenData[index].data.data.ethereum.transactions[0].TxAmountInUSD
              tokenObj.transfers =
                tokenData[index].data.data.ethereum.transfers[0].count
            }
            // console.log('token', tokenObj)
            if (
              index == 3 &&
              tokenData[index] &&
              tokenData[index].status &&
              tokenData[index].data &&
              tokenData[index].data.data &&
              tokenData[index].data.data.ethereum &&
              tokenData[index].data.data.ethereum.transfers.length > 0
            ) {
              tokenObj.burnedTokens =
                tokenData[index].data.data.ethereum.transfers[0].burned
            }
          } else {
            throw new Error
            
          }
        })
        return{status:200,message:"Rug Token Details",data:tokenObj}
        
      } else {
        throw new Error
      }
    } catch (err) {
        throw new Error
    }
  }