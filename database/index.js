require('dotenv').config()
const sql = require("mssql");

const config = {
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  options: {
      trustedConnection: true,
      encrypt: true,
      enableArithAbort: true,
      trustServerCertificate: true,
  }
}

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(async (pool) => {
    console.log('\x1b[33m%s\x1b[0m','Connected to MSSQL')
    return pool
  })
  .catch((err) => console.log('Database Connection Failed! Bad Config: ', err))

module.exports = {
    poolPromise
}