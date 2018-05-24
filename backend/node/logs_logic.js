var genesis = require('./logs_load.js');

var logs = [];
var doneCb;

module.exports = {

    load: function () {
        genesis.set();
        genesis.init(function (lgs) {
            logs = lgs;
        });
    },

    getLogs: function () {
        return logs;
    },

    getLogsBetween: function (start, end) {
        var between = [];

        logs.forEach(function(value) {
            console.log('log: ' + value);
            if (value.timestamp >= start && value.timestamp <= end) {
                console.log('=> pushed');
                between.push(value);
            }
        });

        return between;
    },

    addLog: function (timestamp, log, cb) {
        genesis.getContract().addLog(timestamp.toString(10), log, addLogCb);
        logs.push({ timestamp: timestamp, log: log});
        doneCb = cb;
    }

}

function addLogCb(error) {
    if (!error) {
        console.log("Log added.");
        doneCb();
    } else {
        console.log("Something went wrong while adding the log. See stacktrace.\n", error.stack);
    }
}