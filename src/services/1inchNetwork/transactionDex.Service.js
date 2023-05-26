const { postMethod } = require("../../utilities/methods");
const { mappingBitQueryFields } = require("../../utilities/networks");
const { getBitqueryUrl, getTransactionsBaseAndQuote } = require("../../utilities/urls");

const getTransactionsDexService = async (req, res) => {
    try {

        const { baseAddress, quoteAddress } = req.body;
        const network = req.params.network;
        req.query.network = req.params.network;
        let Network = mappingBitQueryFields(network);
        if (Network) {
            const data = await postMethod(getBitqueryUrl(), getTransactionsBaseAndQuote(Network, baseAddress, quoteAddress))
            if (!data.status) {
                return{
                    status:400,
                    message:"Failed"
                };
            }
            return{
                status:200,
                message:"getTransactionsBaseAndQuote",
                data:bitQueryDex(data)
            };
        }

    }
    catch (err) {
throw new err
    }
}

module.exports = {getTransactionsDexService}