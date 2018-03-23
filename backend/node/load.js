var contracts = require('@monax/legacy-contracts');
var fs = require('fs');

var accounts = require('../../chains/pxl_chain/accounts.json');
var address = require('./jobs_output.json').deployContract;
var abi = JSON.parse(fs.readFileSync('./abi/' + address, 'utf8'));
var ips = require('./ips.json');

var length = 0;
var names = [];
var descriptions = [];
var lecturers = [];
var assignees = [];
var domains = [];
var statuses = [];
var times = [];
var created = [];
var performed = [];
var multiples = [];
var requests = [];
var assignments = [];

var contract;
var balancesCb;
var assignmentsCb;

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
        assignmentsCb = toCall;
        contract.getNamesLength(getLengthCb);
    },

    getContract: function () {
        return contract;
    },

    getAssignments: function () {
        return assignments;
    }
}

function getNames() {
    var index;

    for (index = 0; index < length; index++) {
        contract.getName(index, getNameCb);
    }
}

function getDescriptions() {
    var index;

    for (index = 0; index < length; index++) {
        contract.getDescription(index, getDescriptionCb);
    }
}

function getLecturers() {
    var index;

    for (index = 0; index < length; index++) {
        contract.getLecturer(index, getLecturerCb);
    }
}

function getAssignees() {
    var index;

    for (index = 0; index < length; index++) {
        contract.getAssignee(index, getAssigneeCb);
    }
}

function getDomains() {
    var index;

    for (index = 0; index < length; index++) {
        contract.getDomain(index, getDomainCb);
    }
}

function getStatuses() {
    var index;

    for (index = 0; index < length; index++) {
        contract.getStatus(index, getStatusCb);
    }
}

function getTimes() {
    var index;

    for (index = 0; index < length; index++) {
        contract.getTime(index, getTimeCb);
    }
}

function getCreated() {
    var index;

    for (index = 0; index < length; index++) {
        contract.getCreated(index, getCreatedCb);
    }
}

function getPerformed() {
    var index;

    for (index = 0; index < length; index++) {
        contract.getPerformed(index, getPerformedCb);
    }
}

function getMultiples() {
    var index;

    for (index = 0; index < length ;index++) {
        contract.getMultiple(index, getMultipleCb);
    }
}

function getRequests() {
    var index;

    for (index = 0; index < length ;index++) {
        contract.getRequest(index, getRequestCb);
    }
}

function getLengthCb(error, l) {
    if (!error) {
        length = l;
        getAll();
    } else {
        console.log("Something went wrong while loading the length, see stacktrace.\n" + error.stack);
    }
}

function getNameCb(error, name) {
    if (!error) {
        names.push(name);
    } else {
        console.log("Something went wrong while loading the names, see stacktrace.\n" + error.stack);
    }
}

function getDescriptionCb(error, description) {
    if (!error) {
        descriptions.push(description);
    } else {
        console.log("Something went wrong while loading the descriptions, see stacktrace.\n" + error.stack);
    }
}

function getLecturerCb(error, lecturer) {
    if (!error) {
        lecturers.push(lecturer);
    } else {
        console.log("Something went wrong while loading the lecturers, see stacktrace.\n" + error.stack);
    }
}

function getAssigneeCb(error, assignee) {
    if (!error) {
        assignees.push(assignee);
    } else {
        console.log("Something went wrong while loading the assignees, see stacktrace.\n" + error.stack);
    }
}

function getDomainCb(error, domain) {
    if (!error) {
        domains.push(domain);
    } else {
        console.log("Something went wrong while loading the domains, see stacktrace.\n" + error.stack);
    }
}

function getStatusCb(error, status) {
    if (!error) {
        statuses.push(status.toString(10));
    } else {
        console.log("Something went wrong while loading the statuses, see stacktrace.\n" + error.stack);
    }
}

function getCreatedCb(error, c) {
    if (!error) {
        created.push(c.toString(10));
    } else {
        console.log("Something went wrong while loading the created timestamps, see stacktrace.\n" + error.stack);
    }
}

function getPerformedCb(error, p) {
    if (!error) {
        performed.push(p.toString(10));
    } else {
        console.log("Something went wrong while loading the performed timestamps, see stacktrace.\n" + error.stack);
    }
}

function getMultipleCb(error, multiple) {
    if (!error) {
        multiples.push(multiple);
    } else {
        console.log("Something went wrong while loading the multiple booleans, see stacktrace.\n" + error.stack);
    }
}

function getRequestCb(error, request) {
    if (!error) {
        requests.push(request);
    } else {
        console.log("Something went wrong while loading the requests, see stacktrace.\n" + error.stack);
    }
}

function getTimeCb(error, time) {
    if (!error) {
        times.push(time.toString(10));
        length = length - 1;

        if (length == 0) {
            var x;

            for (x = 0; x < names.length; x++) {
                name = names[x];
                description = descriptions[x];
                lecturer = lecturers[x];
                assignee = assignees[x];
                domain = domains[x];
                status = statuses[x];
                time = times[x];
                creat = created[x];
                perf = performed[x];
                multiple = multiples[x];
                request = requests[x];
                assignments.push({
                    name: name, description: description, lecturer: lecturer,
                    assignee: assignee, domain: domain, status: status, time: time, 
                    created: creat, performed: perf, multiple: multiple,
                    request: request
                });
            }

            assignmentsCb(assignments);

            console.log("Data loaded.");
        }
    } else {
        console.log("Something went wrong, see stacktrace.\n" + error.stack);
    }
}

function getAll() {
    getNames();
    getDescriptions();
    getLecturers();
    getAssignees();
    getDomains();
    getStatuses();
    getCreated();
    getPerformed();
    getMultiples();
    getRequests();
    getTimes();
}