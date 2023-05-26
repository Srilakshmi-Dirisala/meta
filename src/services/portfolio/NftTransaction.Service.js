const { postMethod } = require("../../utilities/methods")
const { mappingBitQueryFields } = require("../../utilities/networks")
const { NftTransactionsQuery, getBitqueryUrl } = require("../../utilities/urls")

const getNftTransactionsService = async (req, res, next) => {
    try {
      req.query.network = req.params.network
      req.query.Address = req.params.Address
      const network = req.params.network
      const Address = req.params.Address
      if (network && Address) {
        let Network = mappingBitQueryFields(network)
        let payload = NftTransactionsQuery(Network, Address)
        const data = await postMethod(getBitqueryUrl(), payload)
        let count = 0
        let firstSalePrice = 0
        let lastSalePrice = 0
        let lastSeller = ''
        if (
          data.data.data.ethereum.dexTrades &&
          data.data.data.ethereum.dexTrades.length > 0
        ) {
          count = data.data.data.ethereum.dexTrades.length
          firstBuyAmount = data.data.data.ethereum.dexTrades[0].buyAmount
          firstSellAmount = data.data.data.ethereum.dexTrades[0].sellAmount
          firstSalePrice =
            firstBuyAmount > 0
              ? firstBuyAmount
              : 0 || firstSellAmount > 0
                ? firstSellAmount
                : 0
          lastBuyAmount = data.data.data.ethereum.dexTrades[count - 1].buyAmount
          lastSellAmount = data.data.data.ethereum.dexTrades[count - 1].sellAmount
          lastSalePrice =
            lastBuyAmount > 0
              ? lastBuyAmount
              : 0 || lastSellAmount > 0
                ? lastSellAmount
                : 0
          lastSeller = data.data.data.ethereum.dexTrades[0].transaction.txFrom
            .address
            ? data.data.data.ethereum.dexTrades[0].transaction.txFrom.address
            : '0x0000000000000000000000000000000000000000'
        }
        // data.data.data.ethereum.dexTrades ? count = data.data.data.ethereum.dexTrades.length : 0
        return{
            status:200,
            message:"get User NFT Transactions",
            data: {
                Transactions: data.data.data.ethereum.dexTrades
                  ? data.data.data.ethereum.dexTrades
                  : [],
                Count: count,
                FirstSale: firstSalePrice,
                LastSale: lastSalePrice,
                LastSeller: lastSeller
              }
        }
      } else {
return{
    status:400,
    message:"Failed"
}      }
    } catch (err) {
    throw new err    }
  }

  module.exports= {getNftTransactionsService}