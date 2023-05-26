const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const { endpoint } = require('../config');
const { poolPromise } = require('../database');
//const redis = require('../cron/dextool')
const utilities = require('../src/utilities');


const protocols = require('../src/routes/protocols.Router')
const supportNetworksTVL = require('../src/routes/TVLSupportNetworks.Router')
const tokenBalance = require('../src/routes/tokenBalance.Router')
const valueToday = require('../src/routes/valueToday.Router');
const TVLComparison = require('../src/routes/TVLComparison.Router')
const volume = require('../src/routes/volume.Router')
const totalDeposit = require('../src/routes/totalDeposit.Router')
const NFTtrades = require('../src/routes/NFTtrades.Router')
const trade24hAmount = require('../src/routes/trade24hAmount.Router') 
const NFTsales = require('../src/routes/NFTsales.Router')
const poolData = require('../src/routes/poolData.Router')
const topNFTsales = require('../src/routes/topNFTsales.Router')
const NFTfloorPrice = require('../src/routes/NFTfloorPrice.Router')
const top5NFTsales = require('../src/routes/top5NFTsales.Router')
const portfolio =require ('../src/routes/portfolio/portfolio.Router')
const allChains = require('../src/routes/portfolio/allChains.Router')
const allCharts = require('../src/routes/portfolio/allCharts.Router')
const marketCapitalization = require('../src/routes/portfolio/marketCapitalization.Router')
const getMarketDexTvl = require('../src/routes/portfolio/marketDexTVL.Router')
const arrivalTime = require('../src/routes/portfolio/arrivalTime.Router')

module.exports = () => { 
  poolPromise;
  for (const utility in utilities) {
    global[utility] = utilities[utility];
  }
//  global['redis'] = redis;
//  redis.setParameter('test', { date: "27-25-01", data: [1, 2, 3, 4] })
//  const dd = redis.getParameter("kkkkk")
//  console.log("DDDD:", dd)
  const app = express();
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.get('/', (req, res) => {
    res.send(`<!DOCTYPE html>
        <html>
        <head>
        <style>
        #customers {
          font-family: Arial, Helvetica, sans-serif;
          border-collapse: collapse;
          width: 100%;
        }
        
        #customers td, #customers th {
          border: 1px solid #ddd;
          padding: 8px;
        }
        
        #customers tr:nth-child(even){background-color: #f2f2f2;}
        
        #customers tr:hover {background-color: #ddd;}
        
        #customers th {
          padding-top: 12px;
          padding-bottom: 12px;
          text-align: left;
          background-color: #04AA6D;
          color: white;
        }
        </style>
        </head>
        <body>
        
        <table id="customers">
          <tr>
            <th>Name</th>
            <th>Url</th>
          </tr>
          <tr>
            <td>Host</td>
            <td><a href="http://localhost:${port}" target="_blank">http://localhost:${port}</a></td>
          </tr>
            <tr>
            <td>Doc</td>
            <td><a href="http://localhost:${port}/docs" target="_blank">http://localhost:${port}/docs</a></td>
          </tr>        
        </table>        
        </body>
        </html>
        `)
        next();

  })
 
 
  app.use(endpoint,protocols)
  app.use(endpoint,supportNetworksTVL)
  app.use(endpoint,tokenBalance)
  app.use(endpoint,TVLComparison)
  app.use(endpoint,valueToday)
  app.use(endpoint,totalDeposit)
  app.use(endpoint,NFTtrades)
  app.use(endpoint,volume)
  app.use(endpoint,trade24hAmount)
  app.use(endpoint,NFTsales)
  app.use(endpoint,poolData)
  app.use(endpoint,topNFTsales)
  app.use(endpoint,NFTfloorPrice)
  app.use(endpoint,top5NFTsales)
  app.use(endpoint,portfolio)
  app.use(endpoint,allChains)
  app.use(endpoint,allCharts)
  app.use(endpoint,marketCapitalization)
  app.use(endpoint,getMarketDexTvl)
  app.use(endpoint,arrivalTime)

  return app;
}