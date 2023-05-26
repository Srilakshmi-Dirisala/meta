const { getMethod } = require("../utilities/methods");
const { supportNetworks } = require("../utilities/networks");
const { getFarmUrl } = require("../utilities/urls");
const { groupByData, dataSort } = require("../utilities/utility");

const farmingPoolsService = async (req, res, next) => {
    try {
        req.params.NetworkOrCoin = req.params.NetworkOrCoin || 'all';

        if (!supportNetworks().find(x => x.name.toLowerCase() === req.params.NetworkOrCoin.toLowerCase())) {
            req.params.NetworkOrCoin = 'all';
        }
        const NetworkOrCoin = req.params.NetworkOrCoin ? req.params.NetworkOrCoin.toLowerCase() === 'all' ? '' : req.params.NetworkOrCoin : "";
        if (NetworkOrCoin) {
            let list = [];
            let DataChain = supportNetworks().find(x => x.name.toLowerCase() === NetworkOrCoin.toLowerCase())
            if (DataChain.name.toLocaleLowerCase() !== 'ethereum') {
                const data = await getMethod(getFarmUrl(DataChain.name.toLocaleLowerCase()))
                if (data.data) {
                    list = data.data.map(x => {
                        let apy = 0;

                        if (x.yield && x.yield.apy) {
                            const str = x.yield.apy.toString();
                            if (str.indexOf('e') !== -1) {
                                //x.yield.apy = 0;
                            }
                            else {
                                apy = x.yield.apy.toFixed(2);
                            }
                        }

                        if (!x.platform) {
                            x.platform
                        }
                        return {
                            id: x.id,
                            name: x.name,
                            platform: x.platform || x.provider.label,
                            icon: x.icon,
                            tvlUSD: x.tvl ? x.tvl.usd ? x.tvl.usd : 0 : 0,
                            tvl: x.tvl,
                            apy: apy,
                            yield: x.yield,
                            chain: DataChain.name,
                            data: { ...x }
                        }
                    })
                }
            }
            // list = dataSort(list, "apy")
            // console.log(list)
            // const sorted = list.sort(function (a, b) {
            //     return b.apy - a.apy;
            // });
            // console.log(sorted)
            const platform = groupByData(list, "platform");
            if (req.query.platform) {
                list = list.filter(x => x.platform.toLocaleLowerCase() === req.query.platform.toLocaleLowerCase())
            }
            const apyTopTen = dataSort(list.filter(x => x.apy), "apy").slice(0, 10);
            const tvlFarm = dataSort(list, "tvlUSD").slice(0, 5);
            return{
                status:200,
                message:"farmingPools",
                data:{ farm: list, platform, tvlFarm, apyTopTen }
            };

        }
        else {
            return{
                status:200,
                message:"farmingPools",
                data:{ farm: [], platform: [] }
            };
        }
    }
    catch (err) {
throw new err    }
}

module.exports={farmingPoolsService}