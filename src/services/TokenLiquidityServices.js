const { postMethod, getMethodwithHeaderskey } = require("../utilities/methods")
const { mappingBitQueryFields } = require("../utilities/networks")
const { getBitqueryUrl, getTokenPair, getLiquidityUrl } = require("../utilities/urls")
const { bitQueryDex } = require("../utilities/utility")

module.exports.getTokenLiquidityServices = async (req) => {
    try {
      const network = req.params.network
      const Address = req.params.Address
      if (network && Address) {
        var key =
          'h3RWJYoYZWUk3nNi0RQvyVrKI9HaRanat9i2LsBvz2DKUlPVcgzTBG8jtLzV792K'
        const data = await postMethod(
          getBitqueryUrl(),
          getTokenPair(mappingBitQueryFields(network), Address)
        )
        const pairResult = bitQueryDex(data)
        // console.log(pairResult)
        const pairResultResp = []
        if (pairResult && pairResult.length > 0) {
          pairResult.map(i => {
            if (
              i.tokenA.address.toLowerCase() === Address.toLowerCase() ||
              i.tokenB.address.toLowerCase() === Address.toLowerCase()
            ) {
              if (
                network === 'Polygon' &&
                Address.toLowerCase() !==
                  '0x2791bca1f2de4661ed88a30c99a7a9449aa84174'.toLowerCase()
              ) {
                if (
                  i.tokenA.address.toLowerCase() ===
                    '0x2791bca1f2de4661ed88a30c99a7a9449aa84174'.toLowerCase() ||
                  i.tokenB.address.toLowerCase() ===
                    '0x2791bca1f2de4661ed88a30c99a7a9449aa84174'.toLowerCase()
                ) {
                  pairResultResp.push(i)
                }
              }
              if (
                network === 'Polygon' &&
                Address.toLowerCase() !==
                  '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270'.toLowerCase()
              ) {
                if (
                  i.tokenA.address.toLowerCase() ===
                    '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270'.toLowerCase() ||
                  i.tokenB.address.toLowerCase() ===
                    '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270'.toLowerCase()
                ) {
                  pairResultResp.push(i)
                }
              }
              if (
                network === 'Ethereum' &&
                Address.toLowerCase() !==
                  '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'.toLowerCase()
              ) {
                if (
                  i.tokenA.address.toLowerCase() ===
                    '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'.toLowerCase() ||
                  i.tokenB.address.toLowerCase() ===
                    '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'.toLowerCase()
                ) {
                  pairResultResp.push(i)
                }
              }
              if (
                network === 'Ethereum' &&
                Address.toLowerCase() !==
                  '0xdac17f958d2ee523a2206206994597c13d831ec7'.toLowerCase()
              ) {
                if (
                  i.tokenA.address.toLowerCase() ===
                    '0xdac17f958d2ee523a2206206994597c13d831ec7'.toLowerCase() ||
                  i.tokenB.address.toLowerCase() ===
                    '0xdac17f958d2ee523a2206206994597c13d831ec7'.toLowerCase()
                ) {
                  pairResultResp.push(i)
                }
              }
              if (
                network === 'Binance' &&
                Address.toLowerCase() !==
                  '0xe9e7cea3dedca5984780bafc599bd69add087d56'.toLowerCase()
              ) {
                if (
                  i.tokenA.address.toLowerCase() ===
                    '0xe9e7cea3dedca5984780bafc599bd69add087d56'.toLowerCase() ||
                  i.tokenB.address.toLowerCase() ===
                    '0xe9e7cea3dedca5984780bafc599bd69add087d56'.toLowerCase()
                ) {
                  // console.log(i)
                  pairResultResp.push(i)
                }
              }
              if (
                network === 'Binance' &&
                Address.toLowerCase() !==
                  '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c'.toLowerCase()
              ) {
                if (
                  i.tokenA.address.toLowerCase() ===
                    '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c'.toLowerCase() ||
                  i.tokenB.address.toLowerCase() ===
                    '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c'.toLowerCase()
                ) {
                  // console.log(i)
                  pairResultResp.push(i)
                }
              }
            }
          })
        }
        let liquidityResp = []
        if (pairResultResp && pairResultResp.length > 0) {
          for (i = 0; i < pairResultResp.length; i++) {
            liquidityResp = await getMethodwithHeaderskey(
              getLiquidityUrl(
                pairResultResp[i].pairAddress.address.address,
                network
              ),
              key
            )
            pairResultResp[i]['liquidity'] = liquidityResp.data
          }
        }
        return{status:200,message:"Token Liquidity",data: pairResultResp}
       
      } else {
        return{status:400,message:"Please check Network/Address!"}
        
      }
    } catch (err) {
      throw new Error
    }
  }