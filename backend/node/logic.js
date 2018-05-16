var genesis = require('./load.js');
var hash = require('hash.js');
var http = require('https');

var part = 13;

var assignments = [];
var assignmentsByLecturer = {};
var assignmentsByTime = {};
var assignmentsByStatus = {};
var assignmentsByDomain = {};
var assignmentsByAssignee = {};

var domains = ["Innovatie", "Student engagement", "Seminaries", "Internationalisering"];

var balancesCb;

module.exports = {
    examine: function (request, cb) {
        var options = {
            host: 'graph.microsoft.com',
            path: '/v1.0/me',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': request.get('Authorization')
            }
        };
        
        var req = http.get(options, res => {
            res.on('data', chunk => {
                chunk = JSON.parse(chunk);
                mail = chunk['mail'];
                jobtitle = chunk["jobTitle"];
                cb(mail, jobtitle);
            })
          });
    },

    load: function () {
        genesis.set();
        genesis.init(function (assigns) {
            assignments = assigns;
            set();
        });
    },

    search: function (needle) {
        var found = [];

        assignments.forEach(function (value) {
            if (value.name.indexOf(needle) > -1) {
                found.push(value);
            }
            else if (value.description.indexOf(needle) > -1) {
                found.push(value);
            }
            else if (value.lecturer.indexOf(needle) > -1) {
                found.push(value);
            }
            else if (value.assignee.indexOf(needle) > -1) {
                found.push(value);
            }
            else if (value.domain.indexOf(needle) > -1) {
                found.push(value);
            }
        });

        return found;
    },




    getDomains: function () {
        return domains;
    },

    getDomainIndex: function (domain) {
        var x;

        for (x = 0; x < domain.length; x++) {
            if (domains[x] == domain) {
                return x;
            }
        }

        throw new Error("Domain not found.");
    },

    getBalance: function (name, callback) {
        genesis.set();
        balancesCb = callback;
        genesis.getContract().getBalance(name, getBalanceCb);
    },

    getAssignments: function () {
        return assignments;
    },

    getAssignmentsByTime: function (time) {
        if (assignmentsByTime[time] != undefined) {
            return assignmentsByTime[time];
        } else {
            return [];
        }
    },

    getAssignmentsByDomain: function (domain) {
        if (domains.includes(domain)) {
            if (assignmentsByDomain[domain] != undefined) {
                return assignmentsByDomain[domain];
            }
            else {
                return [];
            }
        } else {
            throw new Error("Domain not found.");
        }
    },

    getAssignmentsByLecturer: function (lecturer) {
        if (assignmentsByLecturer[lecturer] != undefined) {
            return assignmentsByLecturer[lecturer];
        } else {
            return [];
        }
    },

    getAssignmentsByStatus: function (status) {
        if (status >= 0 && status <= 2) {
            if (assignmentsByStatus[status] != unefined) {
                return assignmentsByStatus[status];
            } else {
                return [];
            }
        } else {
            throw new Error("Status not valid.");
        }
    },

    getAssignmentsAfterCreated: function (time) {
        var toReturn = [];
        var x;

        for (x = 0; x < assignments.length; x++) {
            if (assignments[x].created > time) {
                toReturn.push(assignments[x]);
            }
        }

        return toReturn;
    },

    getAssignmentsBeforeCreated: function (time) {
        var toReturn = [];
        var x;

        for (x = 0; x < assignments.length; x++) {
            if (assignments[x].created < time) {
                toReturn.push(assignments[x]);
            }
        }

        return toReturn;
    },

    getAssignmentsBeforePerformed: function (time) {
        var toReturn = [];
        var x;

        for (x = 0; x < assignments.length; x++) {
            if (assignments[x].performed < time) {
                toReturn.push(assignments[x]);
            }
        }

        return toReturn;
    },

    checkIfAssignmentExists: function (name) {
        return getIndex(assignments, name) != -1;
    },

    getAssignmentsAfterPerformed: function (time) {
        var toReturn = [];
        var x;

        for (x = 0; x < assignments.length; x++) {
            if (assignments[x].performed > time) {
                toReturn.push(assignments[x]);
            }
        }

        return toReturn;
    },

    getAssignmentByAssigneeByDomain: function (assignee, domain) {
        var assignments = assignmentsByAssignee[assignee];
        var toReturn = [];

        if (assignments != undefined && domains.includes(domain)) {
            assignments.forEach(function (value) {
                if (value.domain == domain) {
                    toReturn.push(value);
                }
            })

            return toReturn;
        } else {
            throw new Error("Domain not found or assignments not loaded.");
        }
    },

    getAssignmentsByAssigneeByStatus: function (assignee, status) {
        var assignments = assignmentsByAssignee[assignee];
        var toReturn = [];

        if (assignments != undefined && status >= 0 && status <= 2) {
            assignments.forEach(function (value) {
                if (value.status == status) {
                    toReturn.push(value);
                }
            })

            return toReturn;
        } else {
            if (assignments == undefined) {
                return [];
            }

            throw new Error("Status not valid or assignments not loaded.");
        }
    },

    getAssignmentByAssigneeByStatusByDomain: function (assignee, status, domain) {
        var assignments = assignmentsByassignee[assignee];
        var toReturn = [];

        if (assignments != undefined && status >= 0 && status <= 2 && domain.includes(domain)) {
            assignments.forEach(function (value) {
                if (value.status == status && value.domain == domain) {
                    toReturn.push(value);
                }
            })

            return toReturn;;
        }

        throw new Error("Status not valid or domain not found or assignments not loaded.");
    },

    getAssignmentByLecturerByDomain: function (lecturer, domain) {
        var assignments = assignmentsByLecturer[lecturer];
        var toReturn = [];

        if (assignments != undefined && domain.includes(domain)) {
            assignments.forEach(function (value) {
                if (value.domain == domain) {
                    toReturn.push(value);
                }
            })

            return toReturn;
        }

        throw new Error("Domain not found or assignments not loaded.");
    },

    getAssignmentByLecturerByStatus: function (lecturer, status) {
        var assignments = assignmentsByLecturer[lecturer];
        var toReturn = [];

        if (assignments != undefined && status >= 0 && status <= 2) {
            assignments.forEach(function (value) {
                if (value.status == status) {
                    toReturn.push(value);
                }
            })

            return toReturn;
        }

        throw new Error("Status not valid or assignments not loaded.");
    },

    getAssignmentByLecturerByStatusByDomain: function (lecturer, status, domain) {
        var assignments = assignmentsByLecturer[lecturer];
        var toReturn = [];

        if (assignments != undefined && status >= 0 && status <= 2 && domain.includes(domain)) {
            assignments.forEach(function (value) {
                if (value.status == status && value.domain == domain) {
                    toReturn.push(value);
                }
            })

            return toReturn;
        }

        throw new Error("Domain not found or status not valid or assignments not loaded.");
    },

    getRequestsByStudent: function (student) {
        var toReturn = [];
        var x;

        for (x = 0; x < assignments.length; x++) {
            if (assignments[x].request.indexOf(student) > -1) {
                toReturn.push(assignments[x]);
            }
        }

        return toReturn;
    },

    getAssignmentsByAssignee: function (assignee) {
        if (assignmentsByAssignee[assignee] !== undefined) {
            return assignmentsByAssignee[assignee];
        } else {
            return [];
        }
    },

    getAssignmentByName: function (name) {
        for (x = 0; x < assignments.length; x++) {
            if (assignments[x].name.trim() === name.trim()) {
                return assignments[x];
            }
        }

        return undefined;
    },

    getOpenAssignments: function (user) {
        var toReturn = [];
        var x;

        for (x = 0; x < assignments.length; x++) {
            if (assignments[x].status == 0 && assignments[x].request.indexOf(user) === -1 && assignments[x].assignee.indexOf(user) === -1) {
                toReturn.push(assignments[x]);
            }
        }

        return toReturn;
    },

    getAssignmentsWithOpenRequests: function (lecturer) {
        var toReturn = [];
        var x;
        var arr = assignmentsByLecturer[lecturer];

        if (arr != undefined) {
            for (x = 0; x < arr.length; x++) {
                if (arr[x].request != '') {
                    toReturn.push(arr[x]);
                }
            }

            return toReturn;
        } else {
            throw new Error("Lecturer not found.");
        }
    },




    setDomain: function (domain) {
        if (!domains.includes(domain)) {
            domains.push(domain);
        } else {
            throw new Error("Domain already exists.");
        }
    },

    setBalance: function (name, amount) {
        genesis.set();
        genesis.getContract().setBalance(name, amount, setBalanceCb);
    },

    addAssignment: function (assignment) {
        if (domains.includes(assignment._domain) && getIndex(assignments, assignment._name) == -1) {
            var nAssignment = {};

            var newHash = hash.sha256().update(assignment._name + "_" + assignment._description + "_" + assignment._lecturer + "_" + assignment._time + "_" + assignment._deadline).digest("hex");

            genesis.set();
            genesis.getContract().setName(assignment._name, pushCb);
            genesis.getContract().setDescription(assignment._description, pushCb);
            genesis.getContract().setLecturer(assignment._lecturer, pushCb);
            genesis.getContract().setAssignee('', pushCb);
            genesis.getContract().setDomain(assignment._domain, pushCb);
            genesis.getContract().setStatus(0, pushCb)
            genesis.getContract().setTime(Math.floor(assignment._time), pushCb);
            genesis.getContract().setCreated(Date.now().toString(), pushCb);
            genesis.getContract().setPerformed('', pushCb);
            genesis.getContract().setMaximum(assignment._maximum, pushCb);
            genesis.getContract().setRequest('', pushCb);
            genesis.getContract().setDeadline(assignment._deadline, pushCb);
            genesis.getContract().setHandicap(parseInt(assignment._handicap, 10), pushCb);
            genesis.getContract().setHash(newHash);
            console.log("handicap: " + parseInt(Math.floor(assignment._handicap), 10));
            nAssignment["name"] = assignment._name;
            nAssignment["description"] = assignment._description;
            nAssignment["lecturer"] = assignment._lecturer;
            nAssignment["domain"] = assignment._domain;
            nAssignment["time"] = assignment._time;
            nAssignment["maximum"] = assignment._maximum;
            nAssignment["created"] = Date.now().toString();
            nAssignment["performed"] = '';
            nAssignment["assignee"] = '';
            nAssignment["status"] = 0;
            nAssignment["request"] = '';
            nAssignment["handicap"] = assignment._handicap;
            nAssignment["deadline"] = assignment._deadline;
            nAssignment["hash"] = newHash;
            assignments.push(nAssignment);

            set();
        } else {
            throw new Error("Domain not found or name already exists.");
        }
    },

    addRequest: function (assignment, user) {
        var index = getIndex(assignments, assignment);
        if (index > -1) {
            if (assignments[index].status == 0) {
                var req = assignments[index].request;
                var assignees = assignments[index].assignee;
                if (req === '' && assignees.indexOf(user) == -1) {
                    req = '' + user;
                    genesis.getContract().changeRequest(index, req, changeRequestCb);
                    assignments[index].request = req;
                    set();
                } else if (req.indexOf(user) == -1 && assignees.indexOf(user) == -1) {
                    req = req + ', ' + user;
                    genesis.getContract().changeRequest(index, req, changeRequestCb);
                    assignments[index].request = req;
                    set();
                } else {
                    throw new Error("Double request.");
                }
            } else {
                throw new Error("Assignment is closed.");
            }
        } else {
            throw new Error("Assignment not found.");
        }
    },




    changeAssignee: function (name, assignee) {
        var index = getIndex(assignments, name);
        if (assignments[index].request.indexOf(assignee) > -1 && assignments[index].assignee.indexOf(assignee) == -1 && assignments[index].assignee != '') {
            genesis.getContract().changeAssignee(index, assignments[index].assignee + ', ' + assignee, changeAssigneeCb);
            assignments[index].assignee += ', ' + assignee;
            this.deleteRequest(name, assignee);
            checkIfClosed();
            set();
        } else if (assignments[index].assignee == '' && assignments[index].request.indexOf(assignee) > -1) {
            genesis.getContract().changeAssignee(index, assignee, changeAssigneeCb);
            assignments[index].assignee = assignee;
            this.deleteRequest(name, assignee);
            checkIfClosed(index);
            set();
        } else {
            throw new Error("Operation not allowed.");
        }
    },

    reset: function (name) {
        var index = getIndex(assignments, name);

        if (index != -1) {
            genesis.getContract().changeRequest(index, '');
            genesis.getContract().changeAssignee(index, '');
            genesis.getContract().changeStatus(index, 0);
            assignments[index].request = '';
            assignments[index].assignee = '';
            assignments[index].status = 0;

            set();
        } else {
            throw new Error("Assignment not found.");
        }
    },

    changeStatus: function (name, status) {
        if (status >= 0 && status <= 2) {
            var index = getIndex(assignments, name);
            genesis.getContract().changeStatus(index, status, changeStatusCb);
            assignments[index].status = status;

            if (status == 1) {
                assignments[index].request = "";
                genesis.getContract().changeRequest(index, "", changeRequestCb);
            }
            if (status == 2) {
                addHours(assignments[index].assignee, assignments[index].deadline, assignments[index].handicap, assignments[index].time);
                assignments[index].request = "";
                assignments[index].performed = Date.now().toString();
                genesis.getContract().changePerformed(index, assignments[index].performed);
                genesis.getContract().changeRequest(index, "", changeRequestCb);
            }

            set();
        } else {
            throw new Error("Operation not allowed.");
        }
    },




    deleteDomain: function (toDelete) {
        var x;

        for (x = 0; x < domains.length; x++) {
            if (domains[x] === toDelete) {
                domains.splice(x, 1);
            }
        }
    },

    deleteRequest: function (assignment, user) {
        var index = getIndex(assignments, assignment);

        if (index > -1) {
            var req = assignments[index].request;
            if (req.indexOf(', ' + user) > -1) {
                req = req.replace(', ' + user, '');
                genesis.getContract().changeRequest(index, req, changeRequestCb);
                assignments[index].request = req;
                set();
            } else if (req.indexOf(user + ', ') > -1) {
                req = req.replace(user + ', ', '');
                genesis.getContract().changeRequest(index, req, changeRequestCb);
                assignments[index].request = req;
                set();
            } else if (req.indexOf(user) > -1) {
                req = req.replace(user, '');
                genesis.getContract().changeRequest(index, req, changeRequestCb);
                assignments[index].request = req;
                set();
            } else {
                throw new Error("Request not found.");
            }
        } else {
            throw new Error("Assignment not found.");
        }
    }
}

function setAssignmentsByLecturer() {
    assignments.forEach(function (value) {
        if (assignmentsByLecturer[value.lecturer] == undefined) {
            assignmentsByLecturer[value.lecturer] = new Array(value);
        } else {
            var arr = assignmentsByLecturer[value.lecturer];
            arr.push(value);
            assignmentsByLecturer[value.lecturer] = arr;
        }
    });
}

function setAssignmentsByAssignee() {
    assignments.forEach(function (value) {
        if (assignmentsByAssignee[value.assignee] == undefined) {
            assignmentsByAssignee[value.assignee] = new Array(value);
        } else {
            var arr = assignmentsByAssignee[value.assignee];
            arr.push(value);
            assignmentsByAssignee[value.assignee] = arr;
        }
    });
}

function setAssignmentsByDomain() {
    assignments.forEach(function (value) {
        if (assignmentsByDomain[value.domain] == undefined) {
            assignmentsByDomain[value.domain] = new Array(value);
        } else {
            var arr = assignmentsByDomain[value.domain];
            arr.push(value);
            assignmentsByDomain[value.domain] = arr;
        }
    });
}

function setAssignmentsByStatus() {
    assignments.forEach(function (value) {
        if (assignmentsByStatus[value.status] == undefined) {
            assignmentsByStatus[value.status] = new Array(value);
        } else {
            var arr = assignmentsByStatus[value.status];
            arr.push(value);
            assignmentsByStatus[value.status] = arr;
        }
    });
}

function setAssignmentsByTime() {
    assignments.forEach(function (value) {
        if (assignmentsByTime[value.time] == undefined) {
            assignmentsByTime[value.time] = new Array(value);
        } else {
            var arr = assignmentsByTime[value.time];
            arr.push(value);
            assignmentsByTime[value.time] = arr;
        }
    });
}

function getIndex(arr, name) {
    var x;

    for (x = 0; x < arr.length; x++) {
        if (arr[x].name == name) {
            return x;
        }
    }

    return -1;
}

function set() {
    assignmentsByAssignee = {};
    assignmentsByDomain = {};
    assignmentsByLecturer = {};
    assignmentsByStatus = {};
    assignmentsByTime = {};
    setAssignmentsByLecturer();
    setAssignmentsByAssignee();
    setAssignmentsByDomain();
    setAssignmentsByTime();
    setAssignmentsByStatus();
}

function changeAssigneeCb(error) {
    if (!error) {
        console.log("Assignee changed.");
    } else {
        console.log("Something went wrong, see stacktrace.\n" + error.stack);
    }
}

function changeStatusCb(error) {
    if (!error) {
        console.log("status changed.");
    } else {
        console.log("Something went wrong, see stacktrace.\n" + error.stack);
    }
}

function changeRequestCb(error) {
    if (!error) {
        console.log("Request deleted/added.");
    } else {
        console.log("Something went wrong, see stacktrace.\n" + error.stack);
    }
}

function pushCb(error) {
    if (!error) {
        console.log("Performing transaction of assignment. " + (100 / 13 * (14 - part)) + "% done.");

        if (part === 1) {
            part = 13;
        } else {
            part = part - 1;
        }
    } else {
        console.log("Something went wrong, see stacktrace.\n" + error.stack);
    }
}

function getBalanceCb(error, output) {
    if (!error) {
        console.log("Retrieved balance: " + output.toString(10));
        balancesCb(output.toString(10));
    } else {
        console.log("Error retrieving balance, see stacktrace.\n" + error.stack);
    }
}

function setBalanceCb(error) {
    if (!error) {
        console.log("Successfully pushed balance.");
    } else {
        console.log("Error pushing balance, see stacktrace.\n" + error.stack);
    }
}

function checkIfClosed(index) {
    var assignment = assignments[index];
    var split = assignment.assignee.split(', ');
    var length = split.length;

    if (length == 1 && split[0] == '') {
        length = 0;
    }

    if (length == assignment.maximum) {
        assignments[index].request = "";
        assignments[index].status = 1;
        genesis.getContract().changeStatus(assignment.name, 1);
        genesis.getContract().changeRequest(assignment.name, "");
        set();
    }
}

function addHours(assignees, deadline, handicap, hours) {
    var split = assignees.split(',');
    var x = 0;

    console.log("requests: " + assignees);
    console.log("split: " + split);

    for (x = 0; x < split.length; x++) {
        if (split[x] != '') {
            var current = new Date().getTime();

            if (current > parseInt(deadline, 10)) {
                console.log("result: " + parseInt(hours, 10) * parseInt(handicap, 10) / 100);
                console.log(Math.floor(parseInt(hours, 10) * parseInt(handicap, 10) / 100));
                module.exports.setBalance(split[x], Math.floor(parseInt(hours, 10) * parseInt(handicap, 10) / 100));
            } else {
                console.log("before deadline");
                console.log("user: " + split[x] + ", hours: " + hours);
                module.exports.setBalance(split[x], hours);
            }
        }
    }
}