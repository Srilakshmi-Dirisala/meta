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
  
    mailOptions: {
      // apiKey: `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`,
      apiKey: `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`,
      from: 'metadappservices@gmail.com'
    }}