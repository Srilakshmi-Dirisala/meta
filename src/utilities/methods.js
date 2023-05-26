const axios = require('axios')
var rp = require('request-promise')

module.exports.getMethod = async url => {
  try {
    // console.log('--URL--', url)
    const { data } = await axios(url)
    return { data, status: true }
  } catch (err) {
    return { message: err.message, status: false }
  }
}

module.exports.getMethodwithHeaderskey = async (url, key) => {
  try {
    // console.log('--headerKey--', headerKey)
    // console.log(url, key)
    const Headers = {
      'X-API-KEY': key
    }
    const { data } = await axios(url, { headers: Headers })
    return { data, status: true }
  } catch (err) {
    return { message: err.message, status: false }
  }
}

module.exports.postMethod = async (url, payload) => {
  try {
    if (url === 'https://graphql.bitquery.io') {
      const headers = {
        'Content-Type': 'application/json',
        'X-API-KEY': 'BQYzBjixvRbRtQXQORlYAbVhEnk8yFfo'
      }
      console.log('graphql')
      const { data } = await axios.post(url, payload, {
        headers: headers
      })

      return { data, status: true }
    } else {
      const { data } = await axios.post(url, payload)
      // console.log(JSON.stringify(data))
      return { data, status: true }
    }
  } catch (err) {
    
    return { message: err.message, status: false }
  }
}

module.exports.getMethodWithHeaders = async url => {
  try {
    console.log('--URL--', url)
    const options = {
      method: 'GET',
      uri: url,
      json: true // Automatically stringifies the body to JSON
    }
    const resp = await rp(options)
    return { data: resp, status: true }
  } catch (err) {
    return { message: err.message, status: false }
  }
}
