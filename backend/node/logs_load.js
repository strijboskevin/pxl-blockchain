var contracts = require('@monax/legacy-contracts');
var fs = require('fs');

var accounts = require('../../chains/pxl_chain/accounts.json');
var address = require('./jobs_output.json').deployContract;
var abi = JSON.parse(fs.readFileSync('./abi/' + address, 'utf8'));
var ips = require('./ips.json');

var length = 0;
var loaded = 0;
var logs = [];

var contract;
var logsCb;

module.exports = {

    set: function () {
        try {
            var chainUrl = 'http://' + ips[Math.floor(Math.random() * ips.length)];
            var manager = contracts.newContractManagerDev(chainUrl, accounts.pxl_chain_full_000);
            contract = manager.newContractFactory(abi).at(address);
            console.log(chainUrl + ' node chosen.');
        } catch (error) {
            console.log("node '" + chainUrl + "' is down. See stacktrace.\n" + error.stack);
        }
    },

    init: function (toCall) {
        logsCb = toCall;
        contract.getLogsCount(getLengthCb);
    },

    getContract: function () {
        return contract;
    }
}

function getLengthCb(error, l) {
    if (!error) {
        length = l.toString(10);
        getLogs();
    } else {
        console.log("Something went wrong while loading the length of the logs array, see stacktrace.\n" + error.stack);
    }
}

function getLogCb(error, arr) {
    if (!error) {
        logs.push({timestamp: arr[0], log: arr[1]});
        ++loaded;

        if (loaded == length) {
            console.log("Logs loaded.");
            logsCb(logs);
        }
    } else {
        console.log("Something went wrong while loading the logs, see stacktrace.\n" + error.stack);
    }
}

function getLogs() {
    var index;

    for (index=0; index < length ;index++) {
        contract.getLog(index, getLogCb);
    }
}