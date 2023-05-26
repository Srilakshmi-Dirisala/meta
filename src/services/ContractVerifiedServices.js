const { getMethod, postMethod } = require("../utilities/methods")
const { contractVerifyUrl, contractProxyCheck, contractProxyUrl } = require("../utilities/urls")
const { cakeToken, reflectionToken, migrator } = require("../utilities/web3")

module.exports.getContractVerifiedServices = async (req) => {
    try {
      req.query.network = req.params.network
      req.query.Address = req.params.Address
      const network = req.params.network
      const Address = req.params.Address
      if (network && Address) {
        const data = await getMethod(contractVerifyUrl(network, Address))
        const proxyresp = await postMethod(contractProxyCheck(network, Address))
        let proxyStatus = '0'
        let mintStatus = '0'
        let reflectionTokenStatus = '0'
        let liquidityStatus = '0'
        let migratorcodeStatus = '0'
        let value = 0
        let contractERCInstance = cakeToken(Address)
        let contractInstance = reflectionToken(Address)
        let migratorInstance = migrator(Address)
        if (
          data &&
          data.data &&
          data.data.status &&
          contractERCInstance &&
          contractInstance &&
          migratorInstance
        ) {
          if (proxyresp && proxyresp.data && proxyresp.data.status) {
            const statusResp = await getMethod(
              contractProxyUrl(network, proxyresp.data.result)
            )
            if (statusResp.status) {
              proxyStatus = statusResp.data.status
              value = value + 150
            }
          }
          // console.log(data)
          if (data.data.status == '1') {
            value = value + 300
          }
  
          if (contractERCInstance.methods.mint) {
            mintStatus = '1'
            value = value + 50
          }
  
          if (contractInstance.methods.reflectionFromToken) {
            reflectionTokenStatus = '1'
            value = value + 50
          }
  
          if (contractInstance.methods.geUnlockTime) {
            liquidityStatus = '1'
            value = value + 100
          }
  
          if (migratorInstance.methods.initialize) {
            migratorcodeStatus = '1'
            value = value + 50
          }
        }
        
        return{status:200,message:"Rug parameters status",data:{
            contractVerified: data.data.status,
            migratorcodeStatus: migratorcodeStatus,
            mintStatus: mintStatus,
            proxyStatus: proxyStatus,
            reflectionTokenStatus: reflectionTokenStatus,
            liquidityStatus: liquidityStatus,
            value: value
          }}
      } else {
        throw new Error
      }
    } catch (err) {
        throw new Error
     
    }
  }