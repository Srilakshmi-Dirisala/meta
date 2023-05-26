module.exports.sortedNftsServices = async (req) => {
    try {
      const address = req.params.address
      const sortType = req.params.sortType ? req.params.sortType : ''
      let skip = (req.params.page ? Number(req.params.page) - 1 : 0) * 52
      if (
        sortType.toLocaleLowerCase() === 'Rarity'.toLocaleLowerCase() ||
        sortType === ''
      ) {
        const sortedData = await nftsMaster
          .find(
            {
              'asset_contract.address': address
            },
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
          .sort({ nftRarityScore: -1 })
          .skip(skip)
          .limit(52)
        let resp = []
        if (sortedData && sortedData.length > 0) {
          resp = sortedData.map((x, index) => {
            // console.log(skip)
            // x.rank = skip++
            return { ...x._doc, rank: index + skip + 1 }
          })
        }
        responseHandler.successResponse(res, resp, 'Sorted Data!')
      } else if (sortType.toLocaleLowerCase() === 'TokenId'.toLocaleLowerCase()) {
        const sortedData = await nftsMaster.find({ 'asset_contract.address': address },
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
        ).sort({ token_id: 1 }).limit(52).skip(skip)
  
        responseHandler.successResponse(res, sortedData, 'Sorted Data!')
      } else {
        const sortedData = await nftsMaster
          .find(
            { 'asset_contract.address': address },
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
          .sort({ nftRarityScore: -1 })
          .limit(52)
          .skip(skip)
        responseHandler.successResponse(res, sortedData, 'Sorted Data!')
      }
    } catch (err) {
      // console.log(err)
      responseHandler.errorResponse(res, err.message)
    }
  }