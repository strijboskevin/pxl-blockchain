var genesis = require('./logs_load.js');

var logs = [];

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
            if (value.timestamp >= start && value.timestamp <= end) {
                between.push(value);
            }
        });

        return value;
    },

    addLog: function (timestamp, log) {
        genesis.getContract().addLog(timestamp, log, addLogCb);
        logs.push({ timestamp: timestamp, log: log});
    }

}

function addLogCb(error) {
    if (!error) {
        console.log("Log added.");
    } else {
        console.log("Something went wrong while adding the log. See stacktrace.\n", error.stack);
    }
}