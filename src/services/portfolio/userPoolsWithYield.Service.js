const { getMethod } = require("../../utilities/methods")
const { getPoolsWithYield } = require("../../utilities/urls")

const getUserPoolsWithYieldService = async (req, res, next) => {
    try {
      // const Address = req.params.Address
  
      const data = await getMethod(getPoolsWithYield(req.headers.address))
      if (!data.status) {
        responseHandler.errorResponse(res, err.message)
        return
      }
      const pools = []
      if (data.status && data.data.status && data.data.result) {
        let obj = data.data.result
        for (const i in obj) {
          if (obj[i] && Object.keys(obj[i]) && Object.keys(obj[i]).length > 0) {
            for (const x in obj[i]) {
              for (const y in obj[i][x]) {
                if (y === 'vaults') {
                  if (obj[i][x][y].length > 0) {
                    for (let index = 0; index < obj[i][x][y].length; index++) {
                      const pendingTokens = obj[i][x][y][index].pendingRewards
                        ? Number(obj[i][x][y][index].pendingRewards)
                        : 0
                      const pendingTokenPrice = obj[i][x][y][index]
                        .priceInUSDRewardToken
                        ? Number(obj[i][x][y][index].priceInUSDRewardToken)
                        : 0
                      const depositTokens =
                        obj[i][x][y][index].depositedTokens &&
                          Number(obj[i][x][y][index].depositedTokens) > 0
                          ? obj[i][x][y][index].depositedTokens
                          : 0
  
                      const depositTokenPrice =
                        obj[i][x][y][index].priceInUSDDepositToken &&
                          Number(obj[i][x][y][index].priceInUSDDepositToken) > 0
                          ? Number(obj[i][x][y][index].priceInUSDDepositToken)
                          : 0
                      const Token0Price =
                        obj[i][x][y][index].LPInfo &&
                          obj[i][x][y][index].LPInfo.priceInUSDToken0 &&
                          Number(obj[i][x][y][index].LPInfo.priceInUSDToken0) > 0
                          ? Number(obj[i][x][y][index].LPInfo.priceInUSDToken0)
                          : 0
  
                      const Token1Price =
                        obj[i][x][y][index].LPInfo &&
                          obj[i][x][y][index].LPInfo.priceInUSDToken1 &&
                          Number(obj[i][x][y][index].LPInfo.priceInUSDToken1) > 0
                          ? Number(obj[i][x][y][index].LPInfo.priceInUSDToken1)
                          : 0
  
                      const staked =
                        obj[i][x][y][index].currentTokens &&
                          Number(obj[i][x][y][index].currentTokens) > 0
                          ? Number(obj[i][x][y][index].currentTokens)
                          : 0
                      const stakedToken0 =
                        obj[i][x][y][index].LPInfo &&
                          obj[i][x][y][index].LPInfo.currentToken0 &&
                          Number(obj[i][x][y][index].LPInfo.currentToken0) > 0
                          ? Number(obj[i][x][y][index].LPInfo.currentToken0)
                          : 0
  
                      const stakedToken1 =
                        obj[i][x][y][index].LPInfo &&
                          obj[i][x][y][index].LPInfo.currentToken1 &&
                          Number(obj[i][x][y][index].LPInfo.currentToken1) > 0
                          ? Number(obj[i][x][y][index].LPInfo.currentToken1)
                          : 0
                      const depositToken0 =
                        obj[i][x][y][index].LPInfo &&
                          obj[i][x][y][index].LPInfo.depositToken0 &&
                          Number(obj[i][x][y][index].LPInfo.depositToken0) > 0
                          ? Number(obj[i][x][y][index].LPInfo.depositToken0)
                          : 0
                      const depositToken1 =
                        obj[i][x][y][index].LPInfo &&
                          obj[i][x][y][index].LPInfo.depositToken1 &&
                          Number(obj[i][x][y][index].LPInfo.depositToken1) > 0
                          ? Number(obj[i][x][y][index].LPInfo.depositToken1)
                          : 0
                      let result = {
                        farm: i,
                        poolName: obj[i][x][y][index].name,
                        platform: obj[i][x][y][index].platform,
                        chainId: obj[i][x][y][index].chainId
                          ? obj[i][x][y][index].chainId
                          : 0,
                        poolInfo: obj[i][x][y][index].poolInfo
                          ? obj[i][x][y][index].poolInfo
                          : {},
                        pendingRewardTokens: pendingTokens,
                        priceInUSDRewardToken: pendingTokenPrice,
                        pendingAmount:
                          pendingTokens && pendingTokenPrice
                            ? Number(pendingTokens * pendingTokenPrice)
                            : 0,
                        stakedTokens:
                          staked > 0 ? staked : stakedToken0 + stakedToken1,
                        stakedAmount:
                          staked > 0 && depositTokenPrice > 0
                            ? staked * depositTokenPrice
                            : stakedToken0 * Token0Price +
                            stakedToken1 * Token1Price,
                        depositedTokens:
                          depositTokens > 0
                            ? depositTokens
                            : depositToken0 + depositToken1,
                        priceInUSDDepositToken:
                          depositTokenPrice > 0
                            ? depositTokenPrice
                            : {
                              Token0Price: Token0Price,
                              Token1Price: Token1Price
                            },
                        stakedTokenShare:
                          (stakedToken0 > 0 || Token0Price > 0) &&
                            (stakedToken1 > 0 || Token1Price > 0)
                            ? {
                              Token0Share: stakedToken0 * Token0Price,
                              Token1Share: stakedToken1 * Token1Price
                            }
                            : {},
                        depositAmount:
                          depositTokens > 0 && depositTokenPrice > 0
                            ? depositTokens * depositTokenPrice
                            : depositToken0 * Token0Price +
                            depositToken1 * Token1Price,
                        yieldTokens:
                          staked > 0 && depositTokens > 0
                            ? staked - depositTokens
                            : stakedToken0 +
                            stakedToken1 -
                            (depositToken0 + depositToken1),
  
                        yieldInUsd:
                          staked > 0 && depositTokens > 0
                            ? staked * depositTokenPrice -
                            depositTokens * depositTokenPrice
                            : stakedToken0 * Token0Price +
                            stakedToken1 * Token1Price -
                            (depositToken0 * Token0Price +
                              depositToken1 * Token1Price),
                        LPInfo: obj[i][x][y][index].LPInfo
                          ? obj[i][x][y][index].LPInfo
                          : {}
                      }
                      pools.push(result)
                    }
                  }
                }
              }
            }
          }
        }
  
        const pendingSum = pools.reduce((Sum, x) => {
          Sum = Sum + x.pendingAmount
          return Sum
        }, 0)
        const stakedSum = pools.reduce((total, x) => {
          total = total + x.stakedAmount
          return total
        }, 0)
  return{
    status:200,
    message:"User Pools With Yield",
    data:{
        data: pools,
        totalStakedValue: stakedSum,
        totalPendingValue: pendingSum
      }
  }
        
      }
    } catch (err) {
throw new err    
    }
  }
module.exports ={getUserPoolsWithYieldService}