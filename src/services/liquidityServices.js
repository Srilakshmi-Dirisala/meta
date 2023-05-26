const { getMethodwithHeaderskey } = require("../utilities/methods")
const { getLiquidityUrl, getTokenPriceFromMoralis } = require("../utilities/urls")

module.exports. getLiquidityInfoServices = async (req) => {
    try {
      const network = req.params.network
      const pairAddress = req.params.pairAddress
      const tokenA = req.params.tokenA
      const tokenB = req.params.tokenB
      let key = moralisKey //'h3RWJYoYZWUk3nNi0RQvyVrKI9HaRanat9i2LsBvz2DKUlPVcgzTBG8jtLzV792K'
  
      const TokenPriceReservesData = await Promise.all([
        getMethodwithHeaderskey(getLiquidityUrl(pairAddress, network), key),
        getMethodwithHeaderskey(getTokenPriceFromMoralis(network, tokenA), key),
        getMethodwithHeaderskey(getTokenPriceFromMoralis(network, tokenB), key)
      ])
      let liquidityInfo = {}
      if (TokenPriceReservesData && TokenPriceReservesData.length > 0) {
        if (
          TokenPriceReservesData[0].status &&
          TokenPriceReservesData[0].data &&
          TokenPriceReservesData[1].status &&
          TokenPriceReservesData[1].data &&
          TokenPriceReservesData[2].status &&
          TokenPriceReservesData[2].data
        ) {
          liquidityInfo.PooledTokenA = TokenPriceReservesData[0].data.reserve0 ? Number(TokenPriceReservesData[0].data.reserve0) / 1e18 : ""
          liquidityInfo.PooledTokenB = TokenPriceReservesData[0].data.reserve1 ? Number(TokenPriceReservesData[0].data.reserve1) / 1e18 : ""
  
          liquidityInfo.TokenAusd = TokenPriceReservesData[1].data.usdPrice ? Number(TokenPriceReservesData[1].data.usdPrice) : ""
          liquidityInfo.TokenBusd = TokenPriceReservesData[2].data.usdPrice ? Number(TokenPriceReservesData[2].data.usdPrice) : ""
  
          liquidityInfo.TokenANativePrice = TokenPriceReservesData[1].data.nativePrice && TokenPriceReservesData[1].data.nativePrice.value && TokenPriceReservesData[1].data.nativePrice.decimals ? Number(TokenPriceReservesData[1].data.nativePrice.value) / Math.pow(10, Number(TokenPriceReservesData[1].data.nativePrice.decimals)) : ""
          liquidityInfo.TokenANativePriceSymbol = TokenPriceReservesData[1].data.nativePrice ? TokenPriceReservesData[1].data.nativePrice.symbol : ""
  
          liquidityInfo.TokenBNativePrice = TokenPriceReservesData[1].data.nativePrice && TokenPriceReservesData[2].data.nativePrice.value && TokenPriceReservesData[2].data.nativePrice.decimals ? Number(Number(TokenPriceReservesData[2].data.nativePrice.value) / Math.pow(10, Number(TokenPriceReservesData[2].data.nativePrice.decimals))) : ""
          liquidityInfo.TokenBNativePriceSymbol = TokenPriceReservesData[2].data.nativePrice ? TokenPriceReservesData[2].data.nativePrice.symbol : ""
  
          liquidityInfo.TokenALiquidityInUsd = (Number(TokenPriceReservesData[1].data.usdPrice) * Number(TokenPriceReservesData[0].data.reserve0)) / 1e18
          liquidityInfo.TokenBLiquidityInUsd = (Number(TokenPriceReservesData[2].data.usdPrice) * Number(TokenPriceReservesData[0].data.reserve1)) / 1e18
          liquidityInfo.TotalLiquidity = (Number(TokenPriceReservesData[1].data.usdPrice) * Number(TokenPriceReservesData[0].data.reserve0)) / 1e18 + (Number(TokenPriceReservesData[2].data.usdPrice) * Number(TokenPriceReservesData[0].data.reserve1)) / 1e18
        }
      }
    
      return{status:200,message:"Pair Liquidity Info!",data:liquidityInfo}
    } catch (err) {
      console.log(err)
      throw new Error
      
    }
  }