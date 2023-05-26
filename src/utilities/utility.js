const moment = require('moment')
const getChains = (data) => {
    let chains = [];
    data.forEach(chain => {
        chains = chainAdd(chains.concat(chain.chains));
    });
    return chains;
}

const chainAdd = (chains) => {
    return [...new Set(chains)];
}

const dataSort = (list, field) => {
    list.sort(function (a, b) {
        var nameA = a[field];
        var nameB = b[field];
        if (nameA > nameB) {
            return -1;
        }
        if (nameA < nameB) {
            return 1;
        }
        return 0;
    });
    return list;

}

const tvlDataSort = (list, field, subfield) => {
    list.sort(function (a, b) {
        var nameA = a[field][subfield];
        var nameB = b[field][subfield];
        if (nameA > nameB) {
            return -1;
        }
        if (nameA < nameB) {
            return 1;
        }
        return 0;
    });
    return list;

}

const totalLiquidityUSD = (list, chins) => {
    let tvs = { totalLiquidityUSD: {}, charts: {}, marketCap: {} };
    list.forEach((l, index) => {
        tvs.totalLiquidityUSD[chins[index].name] = l.data[l.data.length - 1].totalLiquidityUSD;
        tvs.charts[chins[index].name] = l.data;
        tvs.marketCap[chins[index].name] = arraySum(l.data, 'totalLiquidityUSD');
    })
    return tvs;
};

const arraySum = (list, field) => {
    var total = 0;
    for (var i in list) { total += list[i][field]; }
    return total;
}

const lastWeek = (list) => {
    try {
        var now = moment();
        var week = moment().subtract(7, 'days').startOf(now).format('YYYY-MM-DD HH:mm:ss')
        var end = moment(week).unix()

        let allData = []
        for (let i = 0; i < Object.keys(list.charts).length; i++) {
            let count = 0;

            var EthereumData = Object.values(list.charts)[i].map((network) => {

                if (network.date > end) {
                    count = count + network.totalLiquidityUSD;
                    return count;
                }

            })
            allData[i] = { total: count, network: Object.keys(list.charts)[i] }
        }
        return allData;
    }
    catch (err) {
        console.log(err)
    }

}

const previousWeek = (data) => {
    try {
        var date1 = moment(moment().subtract(7, 'd').format('YYYY-MM-DD HH:mm:ss')).unix();
        var date2 = moment(moment().subtract(14, 'd').format('YYYY-MM-DD HH:mm:ss')).unix();

        let allData = []
        for (let i = 0; i < Object.keys(data.charts).length; i++) {
            let count = 0;
            var EthereumData = Object.values(data.charts)[i].map((network) => {
                if (network.date > date2 && network.date < date1) {
                    count = count + network.totalLiquidityUSD;
                    return count;
                }
                allData[i] = { total: count, network: Object.keys(data.charts)[i] }
            })
        }

        return allData;
    }
    catch (err) {
        console.log(err)
    }

}

const totalDepositData = (data) => {
    try {
        let receivedSum = 0;
        let sendSum = 0;
        if (data.data.transactions) {
            for (let i = 0; i < data.data.transactions.length; i++) {
                if (data.data.transactions[i].type === 'receive') {
                    let decimals = data.data.transactions[i].received[0].decimals;
                    let value = parseInt(data.data.transactions[i].received[0].value);
                    value = value / Math.pow(10, decimals)
                    receivedSum = receivedSum + value;
                }
                if (data.data.transactions[i].type === 'send') {
                    let decimals = data.data.transactions[i].sent[0].decimals;
                    let value = parseInt(data.data.transactions[i].sent[0].value);
                    //console.log(data.data.transactions[i].sent[0].value, decimals)
                    value = value / Math.pow(10, decimals)
                    sendSum = sendSum + value;
                }
            }
            return { receivedSum, sendSum };
        }
        else {
            return { message: "No data found" }
        }
    }
    catch (err) {
        console.log(err)
    }
}

const chainDataFilter = (data, field, chain) => {
    if (chain.toLowerCase() === 'all') {
        return data;
    }
    return data.filter(x => x[field].find(y => y.toLowerCase() === chain.toLowerCase()));

}

const chainDataFilterForText = (data, field, chain) => {
    if (chain.toLowerCase() === 'all') {
        return data;
    }
    return data.filter(x => x[field].toLowerCase().includes(chain.toLowerCase()));

}

function convertNumber(Value) {

    // Nine Zeroes for Billions
    return Math.abs(Number(Value)) >= 1.0e+9

        ? (Math.abs(Number(Value)) / 1.0e+9).toFixed(2) + "B"
        // Six Zeroes for Millions 
        : Math.abs(Number(Value)) >= 1.0e+6

            ? (Math.abs(Number(Value)) / 1.0e+6).toFixed(2) + "M"
            // Three Zeroes for Thousands
            : Math.abs(Number(Value)) >= 1.0e+3

                ? (Math.abs(Number(Value)) / 1.0e+3).toFixed(2) + "K"

                : Math.abs(Number(Value));

}

const getNftSalesData = (data) => {
    const res = data.data.data.collections.map((x) => {
        let obj = {
            name: x.name,
            price: x.floorPrice,
            currency: 'ETH',
            icon: x.logo,
            netWorth: x.netWorth
        }
        return obj
    })
    return res;
}

const nftQuery = () => {
    const query = { "query": "\n{\nethereum {\ndexTrades(options: {desc: [\"block.height\", \"tradeIndex\"], limit: 10, offset: 0}, baseCurrency: {is: \"0x06012c8cf97bead5deae237070f9587f8e7a266d\"}){\nblock {\ntimestamp {\ntime(format: \"%Y-%m-%d %H:%M:%S\")\n}\nheight\n}\ntradeIndex\nprotocol\nexchange {\nfullName\n}\nsmartContract {\naddress {\naddress\nannotation\n}}\nbaseAmount\nbaseCurrency {\naddress\nsymbol\n}\nquoteAmount\nquoteCurrency {\naddress\nsymbol\n}\ntransaction {\nhash\n}}\n}}", "variables": {} };
    return query;
}

const Trade24hAmountQuery = () => {
    const query = { "query": "{\n   ethereum {\n    dexTrades(options: {limit: 10 desc: \"tradeAmount\"}\n    date: {after: \"2021-08-30\"}) {\n      count\n      tradeAmount(in: USD)\n      date {date}\n    }\n  }\n}", "variables": "{}" };
    return query;
}

const serialize = (obj) => {
    var str = [];
    for (var p in obj)
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    return str.join("&");
}

const groupByData = (list, filed) => {

    let resp = [];
    for (let item of list) {
        let check = resp.find(x => x[filed].toLowerCase() === item[filed].toLowerCase());
        if (!check) {
            let obj = {};
            obj[filed] = item[filed]
            obj["provider"] = item.data["provider"]
            resp.push(obj)
        }
        // console.log(item);
    }
    return resp;
}
const bitQueryDex = (data) => {
    if (data && data.data && data.data.errors && data.data.errors.length) {
        throw new Error(data.data.errors[0].message)
        return null;
    }
    if (data && data.data && data.data.data && data.data.data.ethereum && data.data.data.ethereum.dexTrades && data.data.data.ethereum.dexTrades.length) {
        return data.data.data.ethereum.dexTrades;
    }
    else {
        return []
    }

}

module.exports = {
    getChains,
    dataSort,
    totalLiquidityUSD,
    previousWeek,
    lastWeek,
    totalDepositData,
    nftQuery,
    Trade24hAmountQuery,
    getNftSalesData,
    chainDataFilter,
    chainDataFilterForText,
    serialize,
    groupByData,
    bitQueryDex,
    tvlDataSort
}
