contract Contract {

    mapping(string => uint) balances;
    string[] names;
    string[] descriptions;
    string[] lecturers;
    string[] assignees;
    string[] domains;
    string[] created_ts;
    string[] performed_ts;
    string[] multiples;
    string[] requests;
    uint[] statuses;
    uint[] times;

    function getBalance(string name) returns (uint retVal) {
        return balances[name];
    }

    function setBalance(string name, uint amount) {
        balances[name] = balances[name] + amount;
    }

    function setName(string name) {
        names.push(name);
    }

    function setDescription(string description) {
        descriptions.push(description);
    }

    function setLecturer(string lecturer) {
        lecturers.push(lecturer);
    }

    function setAssignee(string assignee) {
        assignees.push(assignee);
    }

    function setDomain(string domain) {
        domains.push(domain);
    }

    function setStatus(uint status) {
        statuses.push(status);
    }

    function setTime(uint time) {
        times.push(time);
    }

    function setCreated(string created) {
        created_ts.push(created);
    }

    function setPerformed(string performed) {
        performed_ts.push(performed);
    }

    function setMultiple(string multiple) {
        if (keccak256(multiple) == keccak256("yes") || keccak256(multiple) == keccak256("no")) {
            multiples.push(multiple);
        }
    }

    function setRequest(string request) {
        requests.push(request);
    }

    function getName(uint x) returns (string retVal) {
        return names[x];
    }

    function getDescription(uint x) returns (string) {
        return descriptions[x];
    }

    function getLecturer(uint x) returns (string) {
        return lecturers[x];
    }

    function getAssignee(uint x) returns (string) {
        return assignees[x];
    }

    function getDomain(uint x) returns (string) {
        return domains[x];
    }

    function getStatus(uint x) returns (uint) {
        return statuses[x];
    }

    function getTime(uint x) returns (uint) {
        return times[x];
    }

    function getCreated(uint x) returns (string) {
        return created_ts[x];
    }

    function getPerformed(uint x) returns (string) {
        return performed_ts[x];
    }

    function getMultiple(uint x) returns (string) {
        return multiples[x];
    }

    function getRequest(uint x) returns (string) {
        return requests[x];
    }

    function getNamesLength() returns (uint) {
        return names.length;
    }

    function getDescriptionsLength() returns (uint) {
        return descriptions.length;
    }

    function getLecturersLength() returns (uint) {
        return lecturers.length;
    }

    function getAssigneesLength() returns (uint) {
        return assignees.length;
    }

    function getDomainsLength() returns (uint) {
        return domains.length;
    }

    function getStatusesLength() returns (uint) {
        return statuses.length;
    }

    function getTimesLength() returns (uint) {
        return times.length;
    }

    function getCreatedLength() returns (uint) {
        return created_ts.length;
    }

    function getPerformedLength() returns (uint) {
        return performed_ts.length;
    }

    function getMultiplesLength() returns (uint) {
        return multiples.length;
    }

    function getRequestsLength() returns (uint) {
        return requests.length;
    }

    function changeStatus(uint index, uint status) {
        if (index < statuses.length) {
            statuses[index] = status;

            if (status == 2) {
                setBalance(names[index], times[index]);
            }
        }
    }

    function changeAssignee(uint index, string assignee) {
        if (index < assignees.length) {
            assignees[index] = assignee;
            statuses[index] = 1;
        }
    }

    function changeRequest(uint index, string request) {
        if (index < requests.length) {
            requests[index] = request;
        }
    }

    function changePerformed(uint index, string performed) {
        if (index < performed_ts.length) {
            performed_ts[index] = performed;
        }
    }
}