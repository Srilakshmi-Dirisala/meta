const Web3 = require("web3");
const web3 = new Web3(Web3.givenProvider);
const { migratorAbi } = require("../rugABI/Migratorcode");
const { reflectionTokenAbi } = require("../rugABI/ReflectionToken");
const { cakeAbi } = require("../rugABI/CakeAbi");

module.exports.migrator = (contractAddress) => {
    var migratorContractInstance = new web3.eth.Contract(migratorAbi, contractAddress)
    return migratorContractInstance;
}

module.exports.reflectionToken = (contractAddress) => {
    var contractInstance = new web3.eth.Contract(reflectionTokenAbi, contractAddress);
    return contractInstance;
}
module.exports.cakeToken = (contractAddress) => {
    var cakecontractInstance = new web3.eth.Contract(cakeAbi, contractAddress);
    return cakecontractInstance;
}