var contracts = require('@monax/legacy-contracts');
var fs = require('fs');

var accounts = require('../../chains/pxl_chain/accounts.json');
var address = require('./jobs_output.json').deployContract;
var abi = JSON.parse(fs.readFileSync('./abi/' + address, 'utf8'));
var ips = require('./ips.json');

var length = 0;
var loaded = 0;
var messages = [];

var contract;
var messagesCb;

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
        messagesCb = toCall;
        contract.getMessagesCount(getLengthCb);
    },

    getContract: function () {
        return contract;
    }
}

function getLengthCb(error, l) {
    if (!error) {
        length = l.toString(10);
        getMessages();
    } else {
        console.log("Something went wrong while loading the length of the messages array, see stacktrace.\n" + error.stack);
    }
}

function getMessageCb(error, arr) {
    if (!error) {
        messages.push({sender: arr[0], recipient: arr[1], timestamp: arr[2], text: arr[3], read: arr[4]});
        ++loaded;

        if (loaded == length) {
            console.log("Messages loaded.");
            messagesCb(messages);
        }
    } else {
        console.log("Something went wrong while loading the messages, see stacktrace.\n" + error.stack);
    }
}

function getMessages() {
    var index;

    for (index=0; index < length ;index++) {
        contract.getMessage(index, getMessageCb);
    }

    if (length == 0) {
        messagesCb(messages);
    }
}