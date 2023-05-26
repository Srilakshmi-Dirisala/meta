const getTokenPairInfo = async (req, res, next) => {
  try {
    const network = req.params.network
    const tokenNameOrAddress = req.params.tokenNameOrAddress

    let data = []
    if (network && tokenNameOrAddress) {
      if (network === 'Binance') {
        data = await bscPairs.find({ $text: { $search: tokenNameOrAddress } })
        if (data && data.length > 0) {
          responseHandler.successResponse(res, data, 'Token Info')
        }
        else {
          responseHandler.errorResponse(res, 'Please provide valid token')
        }
      } else if (network === 'Polygon') {
        data = await polygonPairs.find({ $text: { $search: tokenNameOrAddress } })
        if (data && data.length > 0) {
          responseHandler.successResponse(res, data, 'Token Info')
        }
        else {
          responseHandler.errorResponse(res, 'Please provide valid token')
        }
      } else if (network === 'Ethereum') {
        data = await ethPairs.find({ $text: { $search: tokenNameOrAddress } })
        if (data && data.length > 0) {
          responseHandler.successResponse(res, data, 'Token Info')
        }
        else {
          responseHandler.errorResponse(res, 'Please provide valid token')
        }
      }
    }
    else {
      responseHandler.errorResponse(res, 'Please Provide valid Network/Token!')
    }
  } catch (err) {
    console.log(err)
    responseHandler.errorResponse(res, err.message)
  }
}