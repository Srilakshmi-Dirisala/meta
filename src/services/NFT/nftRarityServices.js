
module.exports.nftRarityServices = async (req) => {
  try {
    const name = req.params.name.replace('@@@', '#')
    console.log(name)
    const data = await nftsMaster.find(
      { name: name },
      {
        token_id: 1,
        image_url: 1,
        name: 1,
        external_link: 1,
        permalink: 1,
        nftRarityScore: 1,
        traits: 1,
        traitValueRarity: 1
      }
    )
    if (data && data.length > 0) {
      if (
        data[0].traits &&
        data[0].traits.length > 0 &&
        data[0].traitValueRarity &&
        data[0].traitValueRarity.length > 0
      ) {
        data[0].traits.forEach(x => {
          data[0].traitValueRarity.forEach(y => {
            if (x.value === y.value) {
              x['traitValueRarity'] = y.traitValueRarity
            }
          })
        })
      }
    }
    
    return{status:200,message:"Nft Data with rarity score!",data:data && data.length > 0 ? data[0] : {}}
  } catch (err) {
   throw new Error
  }
}