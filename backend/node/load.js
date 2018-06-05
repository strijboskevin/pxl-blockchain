var contracts = require('@monax/legacy-contracts');
var fs = require('fs');

var accounts = require('../../chains/pxl_chain/accounts.json');
var address = require('./jobs_output.json').deployContract;
var abi = JSON.parse(fs.readFileSync('./abi/' + address, 'utf8'));
var ips = require('./ips.json');

var length = 0;
var msgs_length = 0;
var loaded = 0;

var messages = [];
var names = [];
var descriptions = [];
var lecturers = [];
var assignees = [];
var domains = [];
var statuses = [];
var times = [];
var created = [];
var performed = [];
var maxima = [];
var requests = [];
var deadlines = [];
var handicaps = [];
var hashes = [];
var assignments = [];

var contract;
var balancesCb;
var assignmentsCb;
var messagesCb;

module.exports = {

    /*
    Makes the connection to the blockchain via the 1337 port
    */
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

    /*
    Initializes the loading of the data on the blockchain
    */
    init: function (toCall) {
        assignmentsCb = toCall;
        contract.getNamesLength(getLengthCb);
    },
    
    /*
    Returns the contract received by accessing the abi from Monax
    */
    getContract: function () {
        return contract;
    },

    /*
    Returns all assignments which were loaded
    */
    getAssignments: function () {
        return assignments;
    }
}

/*
Collects all the assignment names from the blockchain
*/
function getNames() {
    var index;

    for (index = 0; index < length; index++) {
        contract.getName(index, getNameCb);
    }
}

/*
Collects all the assignment descriptions from the blockchain
*/
function getDescriptions() {
    var index;

    for (index = 0; index < length; index++) {
        contract.getDescription(index, getDescriptionCb);
    }
}

/*
Collects all the assignment lecturer from the blockchain
*/
function getLecturers() {
    var index;

    for (index = 0; index < length; index++) {
        contract.getLecturer(index, getLecturerCb);
    }
}

/*
Collects all the assignment assignees from the blockchain
*/
function getAssignees() {
    var index;

    for (index = 0; index < length; index++) {
        contract.getAssignee(index, getAssigneeCb);
    }
}

/*
Collects all the assignment domains from the blockchain
*/
function getDomains() {
    var index;

    for (index = 0; index < length; index++) {
        contract.getDomain(index, getDomainCb);
    }
}

/*
Collects all the statuses names from the blockchain
*/
function getStatuses() {
    var index;

    for (index = 0; index < length; index++) {
        contract.getStatus(index, getStatusCb);
    }
}

/*
Collects all the assignment hashes from the blockchain
*/
function getHashes() {
    var index;

    for (index=0; index < length; index++) {
        contract.getHash(index, getHashCb);
    }
}

/*
Collects all the assignment times from the blockchain
*/
function getTimes() {
    var index;

    for (index = 0; index < length; index++) {
        contract.getTime(index, getTimeCb);
    }

    if (length == 0) {
        assignmentsCb(assignments);
    }
}

/*
Collects all the assignment created from the blockchain
*/
function getCreated() {
    var index;

    for (index = 0; index < length; index++) {
        contract.getCreated(index, getCreatedCb);
    }
}

/*
Collects all the assignment performed from the blockchain
*/
function getPerformed() {
    var index;

    for (index = 0; index < length; index++) {
        contract.getPerformed(index, getPerformedCb);
    }
}

/*
Collects all the assignment deadlines from the blockchain
*/
function getDeadlines() {
    var index;

    for (index=0; index < length ;index++) {
        contract.getDeadline(index, getDeadlineCb);
    }
}

/*
Collects all the assignment handicaps from the blockchain
*/
function getHandicaps() {
    var index;

    for (index=0; index < length ;index++) {
        contract.getHandicap(index, getHandicapCb);
    }
}

/*
Collects all the assignment maxima from the blockchain
*/
function getMaxima() {
    var index;

    for (index = 0; index < length ;index++) {
        contract.getMaximum(index, getMaximumCb);
    }
}

/*
Collects all the assignment requests from the blockchain
*/
function getRequests() {
    var index;

    for (index = 0; index < length ;index++) {
        contract.getRequest(index, getRequestCb);
    }
}

function getLengthCb(error, l) {
    if (!error) {
        length = l.toString(10);
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

function getHashCb(error, hash) {
    if (!error) {
        hashes.push(hash);
    } else {
        console.log("Somthing went wrong while loading the hashes, see stacktrace.\n" + error.stack);
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
        created.push(c);
    } else {
        console.log("Something went wrong while loading the created timestamps, see stacktrace.\n" + error.stack);
    }
}

function getPerformedCb(error, p) {
    if (!error) {
        performed.push(p);
    } else {
        console.log("Something went wrong while loading the performed timestamps, see stacktrace.\n" + error.stack);
    }
}

function getDeadlineCb(error, d) {
    if (!error) {
        deadlines.push(d);
    } else {
        console.log("Something went wrong while loading the deadline timestamps, see stacktrace.\n" + error.stack);
    }
}

function getHandicapCb(error, h) {
    if (!error) {
        handicaps.push(h.toString(10));
    } else {
        console.log("Something went wrong while loading the handicaps, see stacktrace.\n" + error.stack);
    }
}

function getMaximumCb(error, maximum) {
    if (!error) {
        maxima.push(maximum.toString(10));
    } else {
        console.log("Something went wrong while loading the maxima numbers, see stacktrace.\n" + error.stack);
    }
}

function getRequestCb(error, request) {
    if (!error) {
        requests.push(request);
    } else {
        console.log("Something went wrong while loading the requests, see stacktrace.\n" + error.stack);
    }
}

/*
This is the last callback that will be called. So, after this callback, it's possible
to collect all the assignments and put them in an array.
*/
function getTimeCb(error, time) {
    if (!error) {
        times.push(time.toString(10));
        length = length - 1;

        // If all components are loaded
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
                maximum = maxima[x];
                request = requests[x];
                deadline = deadlines[x];
                handicap = handicaps[x];
                hash = hashes[x];
                assignments.push({
                    name: name, description: description, lecturer: lecturer,
                    assignee: assignee, domain: domain, status: status, time: time, 
                    created: creat, performed: perf, deadline: deadline, handicap: handicap,
                    maximum: maximum, request: request, hash: hash
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
    getMaxima();
    getRequests();
    getDeadlines();
    getHandicaps();
    getHashes();
    getTimes();
}