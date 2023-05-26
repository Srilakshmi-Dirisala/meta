const { postMethod } = require("../../utilities/methods");
const { supportNetworks } = require("../../utilities/networks");
const { candleSeriesUrl, getBitqueryUrl } = require("../../utilities/urls");

const candleSeriesService = async (req, res, next) => {
    try {
        const { fromTokenAddress, toTokenAddress } = req.body
        if (!fromTokenAddress && !toTokenAddress) {
            return{
                status:400,
                message:"fields missing"
            };
        }
        const NetworkOrCoin = req.params.chain ? req.params.chain.toLowerCase() === 'all' ? '' : req.params.chain : "";
        let chain = supportNetworks().find(x => x.name.toLowerCase() === NetworkOrCoin.toLocaleLowerCase());
        let payload = candleSeriesUrl(chain.name, fromTokenAddress, toTokenAddress)
        const data = await postMethod(getBitqueryUrl(), payload)
        // console.log(data.data.data.ethereum)
        if (!data.status) {
            return{
                status:400,
                message:"Failed"
            };
        }
        return{
            status:400,
            message:"Fetch trade data",
            data:data.data.data.ethereum.dexTrades
        };

    }
    catch (err) {
    throw new err
    }
}

module.exports = {candleSeriesService}