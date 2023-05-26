const config = require('../../config')
module.exports = (req, res, next) => {
  if (!req.headers.address) {
    req.headers.address = '0xb57f6f2f3a44d317852ddf4af7c446b247253ecc'
  }
  // console.log('req.headers.address', req.headers.address)

  if (req.headers['network']) {
    req.network = config.networks[req.headers['network']]
    req.network.selected = true
  }
  if (!req.network) {
    req.network = config.networks['bsc']
    req.network.selected = false
    req.network.default = true
  }
  next()
}
