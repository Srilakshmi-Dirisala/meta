const { getMethod, getMethodwithHeaderskey } = require("../utilities/methods")
const { coingeckoSupportNetworks } = require("../utilities/networks")
const { getRugTokenPrice, getTokenPriceFromMoralis, getRugTokenTotalSupply } = require("../utilities/urls")

module.exports.getChartTokenInfoServices = async (req, res, next) => {
    try {
      const network = req.params.network
      const Address = req.params.Address
      let key = moralisKey
      console.log(key)
      if (network && Address) {
        const chain = coingeckoSupportNetworks(network)
  
        let tokenObj = {
          'priceUSD': '',
          'marketCap': '',
          'usd_24h_vol': '',
          'usd_24h_change': '',
          'last_updated_at': '',
          'totalSupply': '',
          'dilutedMarketcap': '',
          'nativePrice': '',
          'nativeCurrencySymbol': ''
        }
        const tokenData = await Promise.all([
          getMethod(getRugTokenPrice(chain, Address)),
          getMethodwithHeaderskey(getTokenPriceFromMoralis(network, Address), key),
          getMethod(getRugTokenTotalSupply(network, Address))
        ])
        if (tokenData && tokenData.length > 0) {
          tokenData.forEach((x, index) => {
            if (x.status) {
              if (index == 0 && tokenData[index] && tokenData[index].data) {
                let info = tokenData[index].data
                Object.values(info).map(x => {
                  tokenObj.priceUSD = x.usd || 0
                  tokenObj.marketCap = x.usd_market_cap || 0
                  tokenObj.usd_24h_vol = x.usd_24h_vol || 0
                  tokenObj.usd_24h_change = x.usd_24h_change || 0
                  tokenObj.last_updated_at = x.last_updated_at || ''
                })
              }
              if (index == 1 && tokenData[index].status && tokenData[index].data) {
                tokenObj.priceUSD = tokenData[index].data.usdPrice ? Number(tokenData[index].data.usdPrice) : 0.00
                tokenObj.nativePrice = tokenData[index].data.nativePrice && tokenData[index].data.nativePrice.value && tokenData[index].data.nativePrice.value != 0 && tokenData[index].data.nativePrice.decimals && tokenData[index].data.nativePrice.decimals != 0 ? Number(tokenData[index].data.nativePrice.value) / Math.pow(10, Number(tokenData[index].data.nativePrice.decimals)) : 0.00
                tokenObj.nativeCurrencySymbol = tokenData[index].data.nativePrice ? tokenData[index].data.nativePrice.symbol : ''
              }
              if (index == 2 && tokenData[index] && tokenData[index].status && tokenData[index].data) {
                tokenObj.totalSupply = tokenData[index].data ? tokenData[index].data.result ? parseInt(tokenData[index].data.result) / 1e18 : 0 : 0
              }
            }
            tokenObj.dilutedMarketcapInUSD = tokenObj.totalSupply && tokenObj.priceUSD ? Number(tokenObj.totalSupply) * Number(tokenObj.priceUSD) : 0
          })
         
          return{status:200,message:"Token Info",data:tokenObj}
        } else {
         
          return{status:400,data:{}}
        }
      } else {
      
        return{status:400,message:"Please provide Valid data!"}
      }
    } catch (err) {
      throw new Error
    }
  }