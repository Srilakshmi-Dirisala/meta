const { supportNetworks } = require("../../utilities/networks");
const { swapUrl } = require("../../utilities/urls");
const { serialize } = require("../../utilities/utility");
const axios = require('axios');


const swapService = async (req, res, next) => {
    try {
        let slippage = 1
        const { fromTokenAddress, toTokenAddress, amount, fromAddress } = req.body
        if (!fromTokenAddress && !toTokenAddress && !amount && !fromAddress) {
            return{
                status:400,
                message:"fields missing"
            };
        }
        const payload = serialize({ fromTokenAddress, toTokenAddress, amount, fromAddress, slippage })
        const NetworkOrCoin = req.params.chain ? req.params.chain.toLowerCase() === 'all' ? '' : req.params.chain : "";
        let chain = supportNetworks().find(x => x.name.toLowerCase() === NetworkOrCoin.toLocaleLowerCase())
        let callURL = swapUrl(chain.oneInchId, payload);
        if (!(callURL.substring(callURL.indexOf("fromTokenAddress=") + 17,
            callURL.indexOf("fromTokenAddress=") + 59) === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')) //check if this is not the native token
        {
            let globalData = await approveApiCaller(amount, fromAddress, chain.oneInchId)
            // console.log(globalData)
            return{
                status:200,
                message:'Fetch swap data',
                data:globalData
            };
        }
        let globalData = await apiCaller(callURL);
        return{
            status:200,
            message:'Fetch swap data',
            data:globalData
        };
        // console.log(globalData)

        // console.log(callURL)

        //     let callURL = 'https://api.1inch.exchange/v3.0/137/swap?fromTokenAddress=0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee&' +
        // 'toTokenAddress=0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174&' +
        // 'amount=10000000000000&fromAddress=' +
        // wallet.address +
        // '&slippage=1';
    }
    catch (err) {
    throw new err
    }
}

const approveApiCaller = async (value, tokenAddress, chainID) => {
    let url = 'https://api.1inch.exchange/v3.0/' + chainID + '/approve/calldata' +
        (value > -1 && value != null ? "?amount=" + value + "&" : "")
        + "tokenAddress=" + tokenAddress
    let temp = await axios.get(url);
    temp = temp.data;
    delete temp.tx.gasPrice;
    delete temp.tx.gas;
    let val = parseInt(temp.tx["value"]);
    val = '0x' + val.toString(16);
    temp.tx["value"] = val;

    return temp;
}

const apiCaller = async (url) => {
    let temp = await axios.get(url);                //get the api call
    temp = temp.data;                               //we only want the data object from the api call
    delete temp.tx.gasPrice;                        //ethersjs will find the gasPrice needed
    delete temp.tx.gas;                             //ethersjs will find the gasLimit for users

    //we also need value in the form of hex
    let value = parseInt(temp.tx["value"]);			//get the value from the transaction
    value = '0x' + value.toString(16);				//add a leading 0x after converting from decimal to hexadecimal
    temp.tx["value"] = value;						//set the value of value in the transaction object. value referrs to how many of the native token

    //temp.tx["nonce"] = nonce;                     //ethersjs will find the nonce for the user
    //temp.tx.chainId = 137                         //this allows the transaction to NOT be replayed on other chains, ethersjs will find it for the user
    return temp;                                    //return the data
}

module.exports = {swapService,approveApiCaller,apiCaller}