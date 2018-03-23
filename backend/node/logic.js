var http = require('http');
var genesis = require('./load.js');

var part = 11;

var assignments = [];
var assignmentsByLecturer = {};
var assignmentsByTime = {};
var assignmentsByStatus = {};
var assignmentsByDomain = {};
var assignmentsByMultiple = {};

var domains = ["Innovatie", "Student engagement", "Seminaries", "Internationalisering"];

var balancesCb;

module.exports = {
    login: function (request) {
        var auth = request.headers['authorization'];
        console.log('Authorization header: ' + auth);

        if (!auth) {
            return false;
        } else {
            var tmp = auth.split(' ');

            var buf = new Buffer(tmp[1], 'base64');
            var plain_auth = buf.toString();
            console.log("Decoded Authorization: " + plain_auth);

            var creds = plain_auth.split(':');
            var username = creds[0];
            var password = creds[1];

            return username == 'pxl' && password == 'pxl';
        }
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




    getMultiple: function (multiple) {
        if (multiple == "yes" || multiple == "no") {
            return assignmentsByMultiple[multiple];
        } else {
            throw new Error("No valid multiple value set.");
        }
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
        return assignmentsByTime[time];
    },

    getAssignmentsByDomain: function (domain) {
        if (domains.includes(domain)) {
            return assignmentsByDomain[domain];
        } else {
            throw new Error("Domain not found.");
        }
    },

    getAssignmentsByLecturer: function (lecturer) {
        return assignmentsByLecturer[lecturer];
    },

    getAssignmentsByStatus: function (status) {
        if (status >= 0 && status <= 2) {
            return assignmentsByStatus[status];
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

        if (assignments != null && domains.includes(domain)) {
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

    getAssignmentByAssigneeByStatus: function (assignee, status) {
        var assignments = assignmentsByassignee[assignee];
        var toReturn = [];

        if (assignments != null && status >= 0 && status <= 2) {
            assignments.forEach(function (value) {
                if (value.status == status) {
                    toReturn.push(value);
                }
            })

            return toReturn;
        } else {
            throw new Error("Status not valid or assignments not loaded.");
        }
    },

    getAssignmentByAssigneeByStatusByDomain: function (assignee, status, domain) {
        var assignments = assignmentsByassignee[assignee];
        var toReturn = [];

        if (assignments != null && status >= 0 && status <= 2 && domain.includes(domain)) {
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

        if (assignments != null && domain.includes(domain)) {
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

        if (assignments != null && status >= 0 && status <= 2) {
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

        if (assignments != null && status >= 0 && status <= 2 && domain.includes(domain)) {
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
        var toReturn = [];
        var x;

        for (x = 0; x < assignments.length; x++) {
            if (assignments[x].assignee.indexOf(assignee) > -1) {
                toReturn.push(assignments[x]);
            }
        }

        return toReturn;
    },

    getOpenAssignments: function (user) {
        var toReturn = [];
        var x;

        for (x = 0; x < assignments.length; x++) {
            if (assignments[x].status == 0) {
                if (assignments[x].request = '') {
                    toReturn.push(assignments[x]);
                } else if (assignments[x].multiple == 'yes' && assignments[x].request.indexOf(user) == -1) {
                    toReturn.push(assignments[x]);
                }
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
        if (domains.includes(assignment.domain) && getIndex(assignments, assignment.name) == -1 && (assignment.multiple == "yes" || assignment.multiple == "no")) {
            genesis.set();
            genesis.getContract().setName(assignment.name, pushCb);
            genesis.getContract().setDescription(assignment.description, pushCb);
            genesis.getContract().setLecturer(assignment.lecturer, pushCb);
            genesis.getContract().setAssignee('', pushCb);
            genesis.getContract().setDomain(assignment.domain, pushCb);
            genesis.getContract().setStatus(0, pushCb)
            genesis.getContract().setTime(assignment.time, pushCb);
            genesis.getContract().setCreated(Date.now().toString(), pushCb);
            genesis.getContract().setPerformed('', pushCb);
            genesis.getContract().setMultiple(assignment.multiple, pushCb);
            genesis.getContract().setRequest('', pushCb);
            assignment["created"] = Date.now().toString();
            assignment["performed"] = '';
            assignment["assignee"] = '';
            assignment["status"] = 0;
            assignment["request"] = '';
            assignments.push(assignment);

            set();
        } else {
            throw new Error("Domain not found or name already exists or multiple not valid.");
        }
    },

    addRequest: function (assignment, user) {
        var index = getIndex(assignments, assignment);
        if (index > -1) {
            if (assignments[index].status < 2) {
                var req = assignments[index].request;
                var assignees = assignments[index].assignee;
                if (assignees != '' && assignments[index].multiple == 'yes' || assignees == '') {
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
                    throw new Error("Can't add other assignees.");
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
        if (assignments[index].assignee != '' && assignments[index].multiple == "yes" && assignments[index].request.indexOf(assignee) > -1) {
            genesis.getContract().changeAssignee(index, assignments[index].assignee + ', ' + assignee, changeAssigneeCb);
            assignments[index].assignee += ', ' + assignee;
            assignments[index].status = 1;
            this.deleteRequest(name, assignee);
            set();
        } else if (assignments[index].assignee == '' && assignments[index].request.indexOf(assignee) > -1) {
            genesis.getContract().changeAssignee(index, assignee, changeAssigneeCb);
            assignments[index].assignee = assignee;
            assignments[index].status = 1;
            this.deleteRequest(name, assignee);
            set();
            return 1;
        } else {
            throw new Error("Operation not allowed.");
        }
    },

    changeStatus: function (name, status) {
        if (status >= 0 && status <= 2) {
            var index = getIndex(assignments, name);
            genesis.getContract().changeStatus(index, status, changeStatusCb);
            assignments[index].status = status;

            if (status == 2) {
                assignments[index].request = '';
                assignments[index].performed = Date.now();
                genesis.getContract().changePerformed(index, assignments[index].performed);
                genesis.getContract().changeRequest(index, '');
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
        if (assignmentsByDomain[value.domain] == null) {
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

function setAssignmentsByMultiple() {
    assignments.forEach(function (value) {
        if (assignmentsByMultiple[value.multiple] == undefined) {
            assignmentsByMultiple[value.multiple] = new Array(value);
        } else {
            var arr = assignmentsByMultiple[value.multiple];
            arr.push(value);
            assignmentsByMultiple[value.multiple] = arr;
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
    assignmentsByMultiple = {};
    setAssignmentsByLecturer();
    setAssignmentsByAssignee();
    setAssignmentsByDomain();
    setAssignmentsByTime();
    setAssignmentsByStatus();
    setAssignmentsByMultiple();
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
        console.log("Performing transaction of assignment. " + (100 / 11 * (12 - part)) + "% done.");

        if (part === 1) {
            part = 11;
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