const { postMethod } = require("../../utilities/methods");
const { mappingBitQueryFields } = require("../../utilities/networks");
const { getBitqueryUrl, getOHLC } = require("../../utilities/urls");
const { bitQueryDex } = require("../../utilities/utility");

const ohlcService = async (req, res, next) => {
    try {
        const { baseAddress, quoteAddress, interval } = req.body;
        const network = req.params.network;
        req.query.network = req.params.network;
        let Network = mappingBitQueryFields(network);
        if (Network) {
            const data = await postMethod(getBitqueryUrl(), getOHLC(Network, baseAddress, quoteAddress, interval))
            if (!data.status) {
                return{
                    status:400,
                    message:"Failed"
                };
            }
return{
    status:200,
    message:"token search",
    data:bitQueryDex(data)
}
            
        }

    }
    catch (err) {
        throw new err
    }
}

module.exports={ohlcService}