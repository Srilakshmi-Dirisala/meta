const { getMethodwithHeaderskey } = require("../../utilities/methods")
const { supportNetworks } = require("../../utilities/networks")
const { userNftsUrl } = require("../../utilities/urls")

const getUserNftsService = async (req, res, next) => {
    try {
      let key = '737e7778-cdf9-49e3-8060-523f0507f1ce'
      const Address = req.params.Address
      let list = []
      supportNetworks().forEach(network => {
        // console.log(network)
        list.push(
          getMethodwithHeaderskey(userNftsUrl(network.oneInchId, Address), key)
        )
      })
      const resp = await Promise.all(list)
      // console.log(resp)
      let NftData = []
      if (resp.length != 0) {
        resp.map(x => {
          if (x.status && x.data && x.data.data && x.data.data.length > 0) {
            x.data.data.map(i => {
              let obj = {
                name: i.name,
                symbol: i.symbol,
                tokenID: i.tokenID,
                contractAddress: i.contractAddress,
                url: i.url,
                image: i.metadta ? i.metadta.image : '',
                description: i.metadta ? i.metadta.description : ''
              }
              NftData.push(obj)
            })
          }
        })
        // console.log(NftData)
        return{
            status:200,
            message:"User NFT Info",
            data:NftData
        }
      } else {
return{
    status:400,
    message:"Failed"
}      }
    } catch (err) {
throw new err    }
  }

  module.exports = {getUserNftsService}