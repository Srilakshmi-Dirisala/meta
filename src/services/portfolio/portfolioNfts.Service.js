const { getMethodwithHeaderskey, getMethod } = require("../../utilities/methods")
const { moralisSupportNetworks, mappingNetworks } = require("../../utilities/networks")
const { PorfolioNftsUrl } = require("../../utilities/urls")

const getPorfolioNftsService = async (req, res, next) => {
    try {
      let list = []
      moralisSupportNetworks().forEach(network => {
        let Headerkey =
          'h3RWJYoYZWUk3nNi0RQvyVrKI9HaRanat9i2LsBvz2DKUlPVcgzTBG8jtLzV792K'
        list.push(
          getMethodwithHeaderskey(PorfolioNftsUrl(network, req.headers.address)),
          Headerkey
        )
      })
      const resp = await Promise.all(list)
      let result = []
      resp.forEach((x, index) => {
        if (x.status && x.data && x.data.result && x.data.result.length > 0) {
          x.data.result.forEach(x => {
            var obj = {
              chain: mappingNetworks(moralisSupportNetworks()[index]),
              name: x.name,
              symbol: x.symbol,
              amount: x.amount,
              owner_of: x.owner_of,
              token_address: x.token_address,
              token_id: x.token_id,
              synced_at: x.synced_at,
              image: '',
              description: '',
              gif_url: '',
              mp4_url: ''
            }
            if (x.metadata) {
              const metadata = JSON.parse(x.metadata)
              if (metadata.image) {
                obj.image = metadata.image
              }
              if (metadata.description) {
                obj.description = metadata.description
              }
              if (metadata.gif_url) {
                obj.gif_url = metadata.gif_url
              }
              if (metadata.mp4_url) {
                obj.mp4_url = metadata.mp4_url
              }
              if (obj.image) {
                obj.image = obj.image.replace('ipfs://', 'https://ipfs.io/ipfs/')
              }
              // console.log(metadata)
            }
            // else if (x.token_uri) {
            //     console.log(x.token_uri)
            // }
  
            // result.push(x)
            result.push(obj)
          })
        }
      })
  
      const uri_data = result.filter(x => !x.image && x.token_uri)
      const uri_data_non = result.filter(x => x.image || !x.token_uri)
  
      let list_uri = []
      uri_data.forEach(item => {
        list_uri.push(getMethod(item.token_uri))
      })
      const resp2 = await Promise.all(list_uri)
      uri_data.forEach((item, index) => {
        if (resp2[index].status) {
          const metadata = resp2[0].data
          if (!item.name && metadata.name) {
            item.name = metadata.name
          }
          if (metadata.image) {
            item.image = metadata.image
          }
          if (metadata.description) {
            item.description = metadata.description
          }
          if (metadata.gif_url) {
            item.gif_url = metadata.gif_url
          }
          if (metadata.animation_url) {
            item.gif_url = metadata.animation_url
          }
          if (metadata.mp4_url) {
            item.mp4_url = metadata.mp4_url
          }
  
          if (item.image) {
            item.image = item.image.replace(' ipfs://', 'https://ipfs.io/ipfs/')
          }
          next()
        }
      })
      return{
        status:200,
        message:"User NFTs",
        data:uri_data.concat(uri_data_non)
      }
      
    } catch (err) {
throw new err    }
  }
  module.exports = {getPorfolioNftsService}