const { postMethod } = require("../../utilities/methods");
const { mappingBitQueryFields } = require("../../utilities/networks");
const { getBitqueryUrl, getPairsListBasedOnQuoteCurrency } = require("../../utilities/urls");
const { bitQueryDex } = require("../../utilities/utility");

const getPairsService = async (req, res, next) => {
    try {
        req.query.network = req.params.network;
        req.query.name = req.params.name;
        const network = req.params.network;
        const token = req.params.token;
        let Network = mappingBitQueryFields(network);
        if (Network) {
            const data = await Promise.all([postMethod(getBitqueryUrl(), getPairsListBasedOnQuoteCurrency(Network, token)), postMethod(getBitqueryUrl(), getPairsListBasedOnBaseCurrency(Network, token))])
            let base = [];
            let quote = [];
            if (data[0].status) {
                quote = bitQueryDex(data[0])
            }
            if (data[1].status) {
                base = bitQueryDex(data[1])
            }
            return{
                status:200,
                message:"getPairs",
                data:{ base, quote }
            }
        }
        return{
            status:400,
            message:"network not matched"
        }
    }
    catch (err) {
throw new err    }

}
module.exports={getPairsService}