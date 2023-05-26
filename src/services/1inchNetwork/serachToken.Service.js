const { getMethod } = require("../../utilities/methods");
const { mappingBitQueryFields } = require("../../utilities/networks");
const { searchTokenAddress } = require("../../utilities/urls");

const searchTokenService = async (req, res, next) => {
    try {
        req.query.network = req.params.network;
        req.query.name = req.params.name;
        const network = req.params.network;
        const name = req.params.name;
        let Network = mappingBitQueryFields(network);
        if (Network) {
            const data = await getMethod(searchTokenAddress(Network))
            if (!data.status) {
                return{
                    status:400,
                    message:"Failed"
                };
            }
            data.data.tokens = data.data.tokens.filter(x => x.symbol.toLocaleLowerCase().includes(name.toLocaleLowerCase()))
            responseHandler.successResponse(res, data.data, "token search")
            return{
                status:400,
                message:"network not matched",
            };
        }

    }
    catch (err) {
throw new err    }

} 
module.exports={searchTokenService}