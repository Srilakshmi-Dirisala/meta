const { getMethodwithHeaderskey } = require("../../utilities/methods")
const { getCollectionNftsUrl } = require("../../utilities/urls")

module.exports.storeCollectionNftsServices = async (req) => {
    try {
      const collection = req.params.collection
      const nfts = []
      let i = 0
      let load = true
      while (load) {
        let { status, data } = await getnftsList(i, collection)
        let list = data
        if (status === false) {
        }
        let Mlist = list.map(x => {
          return { composite: `${x.id}-${x.name}`, ...x }
        })
        let composites = Mlist.map(x => x.composite)
  
        let dupliacteDate = await nftsMaster.find({
          composite: { $in: composites }
        })
  
        Mlist = Mlist.filter(
          x => !dupliacteDate.find(y => y.composite === x.composite)
        )
        // let token_ids = list.map(x => x.token_id)
        // let ids = list.map(x => x.id)
        // let dupliacteDate = await nftsMaster.find({
        //   $or: [{ id: { $in: ids } }, { token_id: { $in: token_ids } }]
        // })
        // let M_list = list.filter(
        //   x =>
        //     !(
        //       dupliacteDate.find(y => y.token_id === x.token_id) ||
        //       dupliacteDate.find(y => y.id === x.id)
        //     )
        // )
        await nftsMaster.create(Mlist)
        i++
        load = !list.length < 48
      }
      
      return{status:200,message:"Data Inserted!,NFTs of a collection!"}
    } catch (err) {
      console.log(err)
     throw new Error
    }
  }


  const getnftsList = async (i, collection) => {
    try {
      let key = process.env.OPENSEA_KEY
      return new Promise(async resolve => {
        console.log(`****${collection} - ${i}****`)
        const data = await getMethodwithHeaderskey(getCollectionNftsUrl(i, collection), key)
        // console.log(JSON.stringify(data))
        resolve({ status: true, data: data.data ? data.data.assets : [] })
      })
    } catch (err) {
      resolve({ status: false, data: [] })
      // console.log(err)
      // setTimeout(() => {
      //   storeCollectionNfts()
      // }, 10000)
    }
  }