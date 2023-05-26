const env = () => {
    return process.env.NODE_ENV === 'production' ? { endpoint: '/prod/v1', port: 4500 } :
      { endpoint: '/dev/v1', port: 7800 }
  }
  
  module.exports = {
    ...env(),
    networks: {
      bscTestnet: {
        chainId: 97,
        provider: 'BSC Testnet'
      },
      bsc: {
        chainId: 56,
        provider: 'BSC Mainnet'
      }
    },
  
   mailOptions : {
      apiKey: process.env.apiKey,
      mail:process.env.from
    }}