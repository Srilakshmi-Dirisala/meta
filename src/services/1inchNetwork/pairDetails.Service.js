const { postMethod } = require("../../utilities/methods");
const { mappingBitQueryFields } = require("../../utilities/networks");
const { getPairsDetails, getBitqueryUrl } = require("../../utilities/urls");
const { bitQueryDex } = require("../../utilities/utility");

const getPairDetailsService = async (req, res) => {
    try {
        const { baseAddress, quoteAddress } = req.body;
        const network = req.params.network;
        req.query.network = req.params.network;
        let Network = mappingBitQueryFields(network);
        if (Network) {
            const data = await postMethod(getBitqueryUrl(), getPairsDetails(Network, baseAddress, quoteAddress))

            if (!data.status) {
                return{
                    status:400,
                    message:"Failed"
                };
            }
            return{
                status:200,
                message:"getPairsDetails",
                data:bitQueryDex(data)
            };
        }

    }
    catch (err) {
throw new err    }
}

module.exports = {getPairDetailsService}