const { getMethodwithHeaderskey } = require("../../utilities/methods")
const { collectionInfoUrl } = require("../../utilities/urls")

module.exports.getCollectionInfoServices = async (req, res, next) => {
    try {
      let key = process.env.OPENSEA_KEY
      const slug = req.params.slug
      const data = await getMethodwithHeaderskey(collectionInfoUrl(slug), key)
      if (!data.status) {
       
        return{status:200,message:"success",data:data.message}
      }
      let collectionData = {}
      if (data.status && data.data && data.data.collection) {
        collectionData.banner_image_url = data.data.collection.banner_image_url
          ? data.data.collection.banner_image_url
          : ''
        collectionData.description = data.data.collection.description
          ? data.data.collection.description
          : ''
        collectionData.websiteUrl = data.data.collection.external_url
          ? data.data.collection.external_url
          : ''
        collectionData.featured_image_url = data.data.collection
          .featured_image_url
          ? data.data.collection.featured_image_url
          : ''
        collectionData.image = data.data.collection.image_url
          ? data.data.collection.image_url
          : ''
        collectionData.name = data.data.collection.name
          ? data.data.collection.name
          : ''
        collectionData.slug = data.data.collection.slug
          ? data.data.collection.slug
          : ''
        collectionData.telegram_url = data.data.collection.telegram_url
          ? data.data.collection.telegram_url
          : ''
        collectionData.twitter_username = data.data.collection.twitter_username
          ? data.data.collection.twitter_username
          : ''
        collectionData.contract_address =
          data.data.collection.primary_asset_contracts &&
            data.data.collection.primary_asset_contracts.length > 0
            ? data.data.collection.primary_asset_contracts[0].address
            : ''
        collectionData.symbol =
          data.data.collection.primary_asset_contracts &&
            data.data.collection.primary_asset_contracts.length > 0
            ? data.data.collection.primary_asset_contracts[0].symbol
            : ''
        collectionData.stats = data.data.collection.stats
          ? data.data.collection.stats
          : {}
        collectionData.traits = data.data.collection.traits
          ? data.data.collection.traits
          : {}
      }
      return{status:200,message:"A collection Info!",data: collectionData}
    } catch (err) {
      throw new Error
    }
  }