contract Contract {

    mapping(string => uint) balances;
    string[] names;
    string[] descriptions;
    string[] lecturers;
    string[] assignees;
    string[] domains;
    string[] created_ts;
    string[] performed_ts;
    string[] deadline_ts;
    string[] requests;
    string[] hashes;
    uint[] maxima;
    uint[] handicaps;
    uint[] statuses;
    uint[] times;

    struct Message {
        string sender;
        string recipient;
        string timestamp;
        string text;
        string read;
    }

    Message[] messages;

    function addMessage(string sender, string recipient, string timestamp, string text, string read) {
        messages.length++;
        messages[messages.length-1].sender = sender;     
        messages[messages.length-1].recipient = recipient;
        messages[messages.length-1].timestamp = timestamp;
        messages[messages.length-1].text = text;
        messages[messages.length-1].read = read;

    }

    function getMessagesCount() returns (uint) {
        return messages.length;
    }

    function getMessage(uint index) returns (string, string, string, string, string) {
        return (messages[index].sender, messages[index].recipient, messages[index].timestamp, messages[index].text, messages[index].read);
    }

    function changeRead(uint index, string read) {
        messages[index].read = read;
    }

    function getBalance(string name) returns (uint ) {
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

    function setDeadline(string deadline) {
        deadline_ts.push(deadline);
    }

    function setMaximum(uint maximum) {
        maxima.push(maximum);
    }

    function setHandicap(uint handicap) {
        handicaps.push(handicap);
    }

    function setRequest(string request) {
        requests.push(request);
    }

    function setHash(string hash) {
        hashes.push(hash);
    }

    function getName(uint x) returns (string) {
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

    function getDeadline(uint x) returns (string) {
        return deadline_ts[x];
    }

    function getMaximum(uint x) returns (uint) {
        return maxima[x];
    }

    function getHandicap(uint x) returns (uint) {
        return handicaps[x];
    }

    function getRequest(uint x) returns (string) {
        return requests[x];
    }

    function getHash(uint x) returns (string) {
        return hashes[x];
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

    function getDeadlineLength() returns (uint) {
        return deadline_ts.length;
    }

    function getMaximaLength() returns (uint) {
        return maxima.length;
    }

    function getHandicapsLength() returns (uint) {
        return handicaps.length;
    }

    function getRequestsLength() returns (uint) {
        return requests.length;
    }

    function getHashesLength() returns (uint) {
        return hashes.length;
    }

    function changeStatus(uint index, uint status) {
        if (index < statuses.length) {
            statuses[index] = status;
        }
    }

    function changeAssignee(uint index, string assignee) {
        if (index < assignees.length) {
            assignees[index] = assignee;
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