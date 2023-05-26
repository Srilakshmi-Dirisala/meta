const { getMethod } = require("../../utilities/methods");
const { supportNetworks } = require("../../utilities/networks");
const { oneInchTokens } = require("../../utilities/urls");

const getTokensService = async (req, res, next) => {
    try {
        const NetworkOrCoin = req.params.chain ? req.params.chain.toLowerCase() === 'all' ? '' : req.params.chain : "";
        let chain = supportNetworks().find(x => x.name.toLowerCase() === NetworkOrCoin.toLocaleLowerCase());
        const data = await getMethod(oneInchTokens(chain.oneInchId));
        if (!data.status) {
            return{
                status:400,
                message:"Failed"
            }
        }
        return{
            status:200,
            message:"Fetch all getTokens",
            data:data.data.tokens
        }
    }
    catch (err) {
throw new err    }
}

module.exports={getTokensService}