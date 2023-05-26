module.exports. getTokenTradesService=async(req)=>{
try {
    const pairAddress = req.params.pairAddress
    const network = req.params.network
    let data = []
    if (pairAddress && network) {
      data = await wbnbBusdTrades.find({
        $and: [
          { bnbPriceOfBusd: { $ne: null } },
          { usdPriceOfBnb: { $ne: null } },
          { network: network },
          { pairAddress: pairAddress }
        ]
      })
        .sort({ _id: -1, utcTime: -1 })
        .limit(100)
    }
    if (data && data.length > 0) {
      
      return{status:200,message:"Most Latest Trades!",data:data}
    } else {
      
      return{status:200,message:"Please Provide valid info!"}
    }
  } catch (err) {
    console.log(err)
   throw new Error
  }
}