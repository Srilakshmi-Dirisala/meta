const { getMethodwithHeaderskey } = require("../utilities/methods")
const { getBlock, getLogsFromChain, getEncodedData, getTokenPriceFromMoralis } = require("../utilities/urls")
const InputDataDecoder = require('ethereum-input-data-decoder')


module.exports.getLatestPairsTrades = async (req) => {
    try {
      const network = req.params.network
      const pairAddress = req.params.pairAddress
      const tokenAddress = req.params.tokenAddress
  
      let key = 'h3RWJYoYZWUk3nNi0RQvyVrKI9HaRanat9i2LsBvz2DKUlPVcgzTBG8jtLzV792K'
      const Headers = {
        Accept: 'application/json, text/plain, */*',
        'X-API-KEY': key,
        'User-Agent': 'axios/0.21.1'
      }
      const getBlockData = await getMethodwithHeaderskey(getBlock(network), key)
  
      let to_block =
        getBlockData.status &&
          getBlockData.data &&
          Number(getBlockData.data.block) > 0
          ? Number(getBlockData.data.block)
          : 0
      let from_block = Number(to_block) - 100
      console.log(from_block, to_block)
  
      let url = getLogsFromChain(pairAddress, network, from_block, to_block)
      console.log(url)
      const data = await getMethod(url)
      let hash = []
      if (data.status && data.data && data.data.result.length > 0) {
        hash = data.data.result.slice(0, 150).map(x => {
          return axios.get(getEncodedData(x.transactionHash, network), {
            headers: Headers
          })
        })
      }
      const tokenPriceInUSD = await getUSDPriceOfToken(network, tokenAddress)
      const getDecimals = () => {
        return Math.pow(10, Number(tokenPriceInUSD.data.nativePrice.decimals))
      }
      const resp = await Promise.all(hash)
      let decodedResp = []
      const decoder = new InputDataDecoder(abi)
      if (resp && resp.length > 0) {
        resp.forEach(x => {
          if (x.data) {
            const inp = parse(stringify(x.data)).input
            const decodedResult = decoder.decodeData(inp)
            let amountIn = 0,
              amountOut = 0
            if (decodedResult.method) {
              const responseData = getTradeReturnSchema()
              responseData.hash = parse(stringify(x.data)).hash
              responseData.from_address = parse(stringify(x.data)).from_address
              responseData.to_address = parse(stringify(x.data)).to_address
              responseData.gas = Number(parse(stringify(x.data)).gas)
              responseData.gas_price = Number(parse(stringify(x.data)).gas_price)
              responseData.block_timestamp = parse(
                stringify(x.data)
              ).block_timestamp
              responseData.block_number = Number(
                parse(stringify(x.data)).block_number
              )
              responseData.method = decodedResult.method
              responseData.logs = parse(stringify(x.data)).logs
              responseData.TokenPrice = Number(tokenPriceInUSD.data.usdPrice)
              responseData.methodInfo = parse(stringify(decodedResult))
              responseData.network = network
              responseData.pairAddress = pairAddress
              responseData.value =
                Number(parse(stringify(x.data)).value) / getDecimals()
              if (decodedResult.method === 'swapExactETHForTokens') {
                amountOut = new BN(decodedResult.inputs[0])
                responseData.amountIn =
                  Number(parse(stringify(x.data)).value) / getDecimals()
                responseData.amountOut =
                  Number(amountOut.toString(10)) / getDecimals()
                responseData.tradeType = 'BUY'
                responseData.amountInUSD =
                  Number(tokenPriceInUSD.data.usdPrice) *
                  (Number(parse(stringify(x.data)).value) / getDecimals())
                responseData.amountOutInUSD =
                  Number(tokenPriceInUSD.data.usdPrice) *
                  (Number(amountOut.toString(10)) / getDecimals())
              } else if (decodedResult.method === 'swapExactTokensForETH') {
                responseData.tradeType = 'SELL'
                amountIn = new BN(decodedResult.inputs[0])
                decodedResult.inputs[1]
                  ? (amountOut = new BN(decodedResult.inputs[1]))
                  : 0
                responseData.amountIn =
                  Number(amountIn.toString(10)) / getDecimals()
                responseData.amountOut =
                  amountOut != 0
                    ? Number(amountOut.toString(10)) / getDecimals()
                    : Number(parse(stringify(x.data)).value) / getDecimals()
                responseData.amountInUSD =
                  Number(tokenPriceInUSD.data.usdPrice) *
                  (Number(amountIn.toString(10)) / getDecimals())
                responseData.amountOutInUSD =
                  Number(tokenPriceInUSD.data.usdPrice) *
                  (amountOut != 0
                    ? Number(amountOut.toString(10)) / getDecimals()
                    : Number(parse(stringify(x.data)).value) / getDecimals())
              } else if (decodedResult.method === 'swapExactTokensForTokens') {
                const tokenIndex = decodedResult.inputs[2].indexOf(tokenAddress)
                if (tokenIndex === 0) {
                  responseData.tradeType = 'SELL'
                  amountIn = new BN(decodedResult.inputs[0])
                  responseData.amountIn =
                    Number(amountIn.toString(10)) / getDecimals()
                  amountOut = new BN(decodedResult.inputs[1])
                  responseData.amountOut =
                    Number(amountOut.toString(10)) / getDecimals()
                  responseData.amountInUSD =
                    Number(tokenPriceInUSD.data.usdPrice) *
                    (Number(amountIn.toString(10)) / getDecimals())
                  responseData.amountOutInUSD =
                    Number(tokenPriceInUSD.data.usdPrice) *
                    (Number(amountOut.toString(10)) / getDecimals())
                } else {
                  responseData.tradeType = 'BUY'
                  amountOut = new BN(decodedResult.inputs[0])
                  responseData.amountOut =
                    Number(amountOut.toString(10)) / getDecimals()
                  amountIn = new BN(decodedResult.inputs[1])
                  responseData.amountIn =
                    Number(amountIn.toString(10)) / getDecimals()
                  responseData.amountInUSD =
                    Number(tokenPriceInUSD.data.usdPrice) *
                    (Number(amountIn.toString(10)) / getDecimals())
                  responseData.amountOutInUSD =
                    Number(tokenPriceInUSD.data.usdPrice) *
                    (Number(amountOut.toString(10)) / getDecimals())
                }
              } else if (
                decodedResult.method ===
                'swapExactTokensForETHSupportingFeeOnTransferTokens'
              ) {
                responseData.tradeType = 'BUY'
                amountIn = new BN(decodedResult.inputs[0])
                amountOut = new BN(decodedResult.inputs[1])
                responseData.amountIn =
                  Number(amountIn.toString(10)) / getDecimals()
                responseData.amountOut =
                  Number(amountOut.toString(10)) / getDecimals()
                responseData.amountInUSD =
                  Number(tokenPriceInUSD.data.usdPrice) *
                  (Number(amountIn.toString(10)) / getDecimals())
                responseData.amountOutInUSD =
                  Number(tokenPriceInUSD.data.usdPrice) *
                  (Number(amountOut.toString(10)) / getDecimals())
              } else if (
                decodedResult.method ===
                'swapExactETHForTokensSupportingFeeOnTransferTokens'
              ) {
                responseData.tradeType = 'BUY'
                amountOut = new BN(decodedResult.inputs[0])
                responseData.amountOut =
                  Number(amountOut.toString(10)) / getDecimals()
                responseData.amountOutInUSD =
                  Number(tokenPriceInUSD.data.usdPrice) *
                  (Number(amountOut.toString(10)) / getDecimals())
              } else if (decodedResult.method === 'swapETHForExactTokens') {
                responseData.tradeType = 'BUY'
                amountOut = new BN(decodedResult.inputs[0])
                responseData.amountOut =
                  Number(amountOut.toString(10)) / getDecimals()
                responseData.amountOutInUSD =
                  Number(tokenPriceInUSD.data.usdPrice) *
                  (Number(amountOut.toString(10)) / getDecimals())
              } else if (decodedResult.method === 'swapTokensForExactTokens') {
                const tokenIndex = decodedResult.inputs[2].indexOf(tokenAddress)
                if (tokenIndex == 0) {
                  responseData.tradeType = 'SELL'
                  amountIn = new BN(decodedResult.inputs[0])
                  responseData.amountIn =
                    Number(amountIn.toString(10)) / getDecimals()
                  responseData.amountOut =
                    Number(parse(stringify(x.data)).value) / getDecimals()
                  responseData.amountInUSD =
                    Number(tokenPriceInUSD.data.usdPrice) *
                    (Number(amountIn.toString(10)) / getDecimals())
                  responseData.amountOutInUSD =
                    Number(tokenPriceInUSD.data.usdPrice) *
                    (Number(amountOut.toString(10)) / getDecimals())
                } else {
                  responseData.tradeType = 'BUY'
                  amountIn = new BN(decodedResult.inputs[0])
                  responseData.amountIn =
                    Number(amountIn.toString(10)) / getDecimals()
                  amountOut = new BN(decodedResult.inputs[1])
                  responseData.amountOut =
                    Number(amountOut.toString(10)) / getDecimals()
                  responseData.amountInUSD =
                    Number(tokenPriceInUSD.data.usdPrice) *
                    (Number(amountIn.toString(10)) / getDecimals())
                  responseData.amountOutInUSD =
                    Number(tokenPriceInUSD.data.usdPrice) *
                    (Number(amountOut.toString(10)) / getDecimals())
                }
              } else if (
                decodedResult.method ===
                'swapExactTokensForTokensSupportingFeeOnTransferTokens'
              ) {
                const tokenIndex = decodedResult.inputs[2].indexOf(tokenAddress)
                if (tokenIndex === 0) {
                  responseData.tradeType = 'SELL'
                  amountIn = new BN(decodedResult.inputs[0])
                  responseData.amountIn =
                    Number(amountIn.toString(10)) / getDecimals()
                  amountOut = new BN(decodedResult.inputs[1])
                  responseData.amountOut =
                    Number(amountOut.toString(10)) / getDecimals()
                  responseData.amountInUSD =
                    Number(tokenPriceInUSD.data.usdPrice) *
                    (Number(amountIn.toString(10)) / getDecimals())
                  responseData.amountOutInUSD =
                    Number(tokenPriceInUSD.data.usdPrice) *
                    (Number(amountOut.toString(10)) / getDecimals())
                } else {
                  responseData.tradeType = 'BUY'
                  amountOut = new BN(decodedResult.inputs[1])
                  responseData.amountOut =
                    Number(amountOut.toString(10)) / getDecimals()
                  amountIn = new BN(decodedResult.inputs[0])
                  responseData.amountIn =
                    Number(amountIn.toString(10)) / getDecimals()
                  responseData.amountInUSD =
                    Number(tokenPriceInUSD.data.usdPrice) *
                    (Number(amountIn.toString(10)) / getDecimals())
                  responseData.amountOutInUSD =
                    Number(tokenPriceInUSD.data.usdPrice) *
                    (Number(amountOut.toString(10)) / getDecimals())
                }
              }
              decodedResp.push(responseData)
            }
          }
        })
      }
      
return{status:200,message:"inputData!",data:decodedResp && decodedResp.length > 0 ? decodedResp : []}
    } catch (err) {
      // console.log(err)
      
      throw new Error
    }
  }


  const getUSDPriceOfToken = async (network, tokenAddress) => {
    const tokenPrice = await getMethodwithHeaderskey(
      getTokenPriceFromMoralis(network, tokenAddress),
      moralisKey
    )
    return tokenPrice
  }