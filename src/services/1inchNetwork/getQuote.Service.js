const { getMethod } = require("../../utilities/methods");
const { supportNetworks } = require("../../utilities/networks");
const { oneInchQuote } = require("../../utilities/urls");
const { serialize } = require("../../utilities/utility");

const getQuoteService = async (req, res, next) => {
    try {
        const { fromTokenAddress, toTokenAddress, amount } = req.body
        if (!fromTokenAddress && !toTokenAddress && !amount) {
            return{
                status:400,
                message:"fields missing"
            };
        }
        const q = serialize({ fromTokenAddress, toTokenAddress, amount })
        const NetworkOrCoin = req.params.chain ? req.params.chain.toLowerCase() === 'all' ? '' : req.params.chain : "";
        let chain = supportNetworks().find(x => x.name.toLowerCase() === NetworkOrCoin.toLocaleLowerCase());
        const data = await getMethod(oneInchQuote(chain.oneInchId, q));
        if (!data.status) {
            return{
                status:400,
                message:"Failed"
            };
            
        }
        return{
            status:200,
            message:"Fetch all getQuote",
            data:data.data
        };
    }
    catch (err) {
        throw new err
    }
}

module.exports = {getQuoteService}