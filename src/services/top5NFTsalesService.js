const { getMethodwithHeaderskey } = require("../../utilities/methods")
const { getTopNftSalesUrl } = require("../../utilities/urls")

const getTop5NftSalesService = async () => {
    try {
      let key = process.env.OPENSEA_KEY
      const resp = await getMethodwithHeaderskey(getTopNftSalesUrl(), key)
      // console.log("resp",resp);
      let data = []
      if (resp.status && resp.data && resp.data.assets && resp.data.assets.length > 0) {
        resp.data.forEach((x) => {
          let obj = {
            id: x.id ? x.id : '',
            token_id: x.token_id ? x.token_id : '',
            num_sales: x.num_sales ? x.num_sales : 0,
            image_url: x.image_url ? x.image_url : '',
            name: x.name ? x.name : '',
            external_link: x.external_link ? x.external_link : '',
            permalink: x.permalink ? x.permalink : '',
            ethPrice: (x.sell_orders && x.sell_orders.length > 0) ? Number(x.sell_orders[0].current_price) / 1e18 + x.sell_orders[0].payment_token_contract.symbol : 0,
            ethInUsd: (x.sell_orders && x.sell_orders.length > 0) ? Number(x.sell_orders[0].payment_token_contract.usdPrice) : 0,
            usdPrice: obj.ethInUsd * ((x.sell_orders && x.sell_orders.length > 0) ? Number(x.sell_orders[0].current_price) / 1e18 : 0)
          }
          data.push(obj)
        })
        return{
            status:200, 
            message:'Top5 NFT Sales', 
            data: data.length > 0 ? data : [],
        }
      } 
      
      else {
        return {
            status: 400,
            message: data.message,
            data:[],
          };  
      }
    }
    catch (err) {
      console.log(err)
      throw new err

    }
  }
  
  module.exports = {getTop5NftSalesService}