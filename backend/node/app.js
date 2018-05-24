var logic = require('./logic.js');
var messages_logic = require('./messages_logic.js');
var logs_logic = require('./logs_logic.js');
var express = require('express');
var bodyParser = require('body-parser');
var qs = require('querystring');
var cors = require('cors');

logic.load(function () {
  messages_logic.load(function () {
    logs_logic.load();
  });
});

var app = express();

app.use(bodyParser());
app.use(cors());

app.get('/balances/:user', function (request, response) {
  logic.examine(request, function (mail, jobtitle) {
    if ((mail === undefined || mail != request.params.user) && jobtitle.indexOf('Personeel') === -1) {
      response.sendStatus(401);
    } else {
      logic.getBalance(request.params.user, function (result) {
        response.status(200).json({ name: request.params.user, amount: result });
      });
    }
  });
});

app.get('/messages/:user', function (request, response) {
  logic.examine(request, function (mail, jobtitle) {
    if ((mail === undefined || mail != request.params.user) && jobtitle.indexOf('Personeel') === -1) {
      response.sendStatus(401);
    } else {
      response.status(200).json(messages_logic.getMessagesByUser(request.params.user));
    }
  });
});

app.get('/assignments', function (request, response) {
  logic.examine(request, function (mail, jobtitle) {
    if (mail === undefined) {
      response.sendStatus(401);
    } else {
      response.status(200).json(logic.getAssignments());
    }
  });
});

app.get('/logs', function (request, response) {
  logic.examine(request, function (mail, jobtitle) {
    if (!jobtitle.includes('Personeel')) {
      response.sendStatus(401);
    } else {
      response.status(200).json(logs_logic.getLogs());
    }
  });
});

app.get('/logs/:start/:end', function (request, response) {
  logic.examine(request, function (mail, jobtitle) {
    if (!jobtitle.includes('Personeel')) {
      response.sendStatus(401);
    } else {
      response.status(200).json(logs_logic.getLogsBetween(request.params.start, request.params.end));
    }
  });
});

app.get('/assignments/:name', function (request, response) {
  logic.examine(request, function (mail, jobtitle) {
    if (mail === undefined) {
      response.sendStatus(401);
    } else {
      response.status(200).json(logic.getAssignmentByName(request.params.name));
    }
  });
});

app.get('/assignments/time/:time', function (request, response) {
  logic.examine(request, function (mail, jobtitle) {
    if (mail === undefined) {
      response.sendStatus(401);
    } else {
      response.status(200).json(logic.getAssignmentByTime(request.params.time));
    }
  });
});

app.get('/request/student/:student', function (request, response) {
  logic.examine(request, function (mail, jobtitle) {
    if ((mail === undefined || mail !== request.params.student) && jobtitle.indexOf('Personeel') === -1) {
      response.sendStatus(401);
    } else {
      response.status(200).json(logic.getRequestsByStudent(request.params.student));
    }
  });
});

app.get('/request/lecturer/:lecturer', function (request, response) {
  logic.examine(request, function (mail, jobtitle) {
    if (mail === undefined) {
      response.sendStatus(401);
    } else {
      response.status(200).json(logic.getAssignmentsWithOpenRequests(request.params.lecturer));
    }
  });
});

app.get('/assignments/created/before/:timestamp', function (request, response) {
  logic.examine(request, function (mail, jobtitle) {
    if (mail === undefined) {
      response.sendStatus(401);
    } else {
      response.status(200).json(logic.getAssignmentsBeforeCreated(request.params.timestamp));
    }
  });
});

app.get('/assignments/created/after/:timestamp', function (request, response) {
  logic.examine(request, function (mail, jobtitle) {
    if (mail === undefined) {
      response.sendStatus(401);
    } else {
      response.status(200).json(logic.getAssignmentsAfterCreated(request.params.timestamp));
    }
  });
});

app.get('/assignments/performed/before/:timestamp', function (request, response) {
  logic.examine(request, function (mail, jobtitle) {
    if (mail === undefined) {
      response.sendStatus(401);
    } else {
      response.status(200).json(logic.getAssignmentsBeforePerformed(request.params.timestamp));
    }
  });
});

app.get('/assignments/performed/after/:timestamp', function (request, response) {
  logic.examine(request, function (mail, jobtitle) {
    if (mail === undefined) {
      response.sendStatus(401);
    } else {
      response.status(200).json(logic.getAssignmentsAfterPerformed(request.params.timestamp));
    }
  });
});

app.get('/assignments/exists/:name', function (request, response) {
  logic.examine(request, function (mail, jobtitle) {
    if (mail === undefined) {
      response.sendStatus(401);
    } else {
      response.status(200).json(logic.checkIfAssignmentExists(request.params.name));
    }
  });
});

app.get('/domains', function (request, response) {
  logic.examine(request, function (mail, jobtitle) {
    if (mail === undefined) {
      response.sendStatus(401);
    } else {
      response.status(200).json(logic.getDomains());
    }
  });
});

app.get('/domains/:domain/index', function (request, response) {
  logic.examine(request, function (mail, jobtitle) {
    if (mail === undefined) {
      response.sendStatus(401);
    } else {
      response.status(200).json(logic.getDomainIndex(request.params.domain));
    }
  });
});

app.get('/assignments/lecturer/:lecturer', function (request, response) {
  logic.examine(request, function (mail, jobtitle) {
    if (mail !== request.params.lecturer && jobtitle.indexOf('Personeel') === -1) {
      response.sendStatus(401);
    } else {
      response.status(200).json(logic.getAssignmentsByLecturer(request.params.lecturer));
    }
  });
});

app.get('/assignments/assignee/:assignee', function (request, response) {
  logic.examine(request, function (mail, jobtitle) {
    if (mail !== request.params.assignee && jobtitle.indexOf('Personeel') === -1) {
      response.sendStatus(401);
    } else {
      response.status(200).json(logic.getAssignmentsByAssignee(request.params.assignee));
    }
  });
});

app.get('/assignments/status/:status', function (request, response) {
  logic.examine(request, function (mail, jobtitle) {
    if (mail === undefined) {
      response.sendStatus(401);
    } else {
      response.status(200).json(logic.getAssignmentsByStatus(request.params.status));
    }
  });
});

app.get('/assignments/domain/:domain', function (request, response) {
  logic.examine(request, function (mail, jobtitle) {
    if (mail === undefined) {
      response.sendStatus(401);
    } else {
      response.status(200).json(logic.getAssignmentsByDomain(request.params.domain));
    }
  });
});

app.get('/assignments/assignee/:assignee/domain/:domain', function (request, response) {
  logic.examine(request, function (mail, jobtitle) {
    if (mail !== request.params.assignee && jobtitle.indexOf('Personeel') === -1) {
      response.sendStatus(401);
    } else {
      response.status(200).json(logic.getAssignmentsByAssigneeByDomain(request.params.assignee, request.params.domain));
    }
  });
});

app.get('/assignments/assignee/:assignee/status/:status', function (request, response) {
  logic.examine(request, function (mail, jobtitle) {
    if (mail !== request.params.assignee && jobtitle.indexOf('Personeel') === -1) {
      response.sendStatus(401);
    } else {
      response.status(200).json(logic.getAssignmentsByAssigneeByStatus(request.params.assignee, request.params.status));
    }
  });
});

app.get('/assignments/assignee/:assignee/status/:status/domain/:domain', function (request, response) {
  logic.examine(request, function (mail, jobtitle) {
    if (mail !== request.params.assignee && jobtitle.indexOf('Personeel') === -1) {
      response.sendStatus(401);
    } else {
      response.status(200).json(logic.getAssignmentsByAssigneeBystatusByDomain(request.params.assignee, request.params.status, request.params.domain));
    }
  });
});

app.get('/assignments/lecturer/:lecturer/status/:status', function (request, response) {
  logic.examine(request, function (mail, jobtitle) {
    if (mail !== request.params.lecturer && jobtitle.indexOf('Personeel') === -1) {
      response.sendStatus(401);
    } else {
      response.status(200).json(logic.getAssignmentsBylecturerBystatus(request.params.lecturer, request.params.status));
    }
  });
});

app.get('/assignments/lecturer/:lecturer/domain/:domain', function (request, response) {
  logic.examine(request, function (mail, jobtitle) {
    if (mail !== request.params.lecturer && jobtitle.indexOf('Personeel') === -1) {
      response.sendStatus(401);
    } else {
      response.status(200).json(logic.getAssignmentsBylecturerByDomain(request.params.lecturer, request.params.domain));
    }
  });
});

app.get('/assignments/search/:needle', function (request, response) {
  logic.examine(request, function (mail, jobtitle) {
    if (mail === undefined) {
      response.sendStatus(401);
    } else {
      response.status(200).json(logic.search(request.params.needle));
    }
  });
});

app.get('/assignments/open/:student', function (request, response) {
  logic.examine(request, function (mail, jobtitle) {
    if (mail !== request.params.student && jobtitle.indexOf('Personeel') === -1) {
      response.sendStatus(401);
    } else {
      response.status(200).json(logic.getOpenAssignments(request.params.student));
    }
  });
});

app.get('/assignments/lecturer/:lecturer/status/:status/domain/:domain', function (request, response) {
  logic.examine(request, function (mail, jobtitle) {
    if (mail !== request.params.lecturer && jobtitle.indexOf('Personeel') === -1) {
      response.sendStatus(401);
    } else {
      response.status(200).json(logic.getAssignmentsBylecturerBystatusByDomain(request.params.lecturer, request.params.status, request.params.domain));
    }
  });
});




app.post('/balances', function (request, response) {
  logic.examine(request, function (mail, jobtitle) {
    if (mail !== request.body.user && jobtitle.indexOf('Personeel') === -1) {
      response.sendStatus(401);
    } else {
      response.status(200).json(logic.setBalance(request.body.user, request.body.amount));
    }
  });
});

app.post('/assignments', function (request, response) {
  logic.examine(request, function (mail, jobtitle) {
    if (jobtitle.indexOf('Personeel') === -1) {
      response.sendStatus(401);
    } else {
      logs_logic.addLog(new Date().getTime(), mail + ' heeft een opdracht toegevoegd.', function () {
        response.status(200).json(logic.addAssignment(request.body));
      });
    }
  });
});

app.post('/requests', function (request, response) {
  logic.examine(request, function (mail, jobtitle) {
    if (mail !== request.body.user && jobtitle.indexOf('Personeel') === -1) {
      response.sendStatus(401);
    } else {
      logs_logic.addLog(new Date().getTime(), `${request.body.user} heeft opdracht "${request.body.assignment}" aangevraagd.`, function () {
        response.status(200).json(logic.addRequest(request.body.assignment, request.body.user));
      });
    }
  });
});

app.post('/messages', function (request, response) {
  logic.examine(request, function (mail, jobtitle) {
    if (mail !== request.body.sender && jobtitle.indexOf('Personeel') === -1) {
      response.sendStatus(401);
    } else {
      logs_logic.addLog(new Date().getTime(), request.body.sender + ' heeft een bericht gestuurd naar ' + request.body.recipient + '.', function () {
        response.status(200).json(messages_logic.addMessage(request.body.sender, request.body.recipient, request.body.timestamp, request.body.text, request.body.read));
      });
    }
  });
});

app.post('/domains', function (request, response) {
  logic.examine(request, function (mail, jobtitle) {
    if (jobtitle.indexOf('Personeel') === -1) {
      response.sendStatus(401);
    } else {
      response.status(200).json(logic.setDomain(request.body.domain));
    }
  });
});

app.post('/assignments/reset/:name', function (request, response) {
  logic.examine(request, function (mail, jobtitle) {
    if (jobtitle.indexOf('Personeel') === -1) {
      response.sendStatus(401);
    } else {
      logs_logic.addLog(new Date().getTime(), mail + ' heeft opdracht met naam "' + request.params.name + '" gereset.', function () {
        ;
        response.status(200).json(logic.reset(request.params.name));
      });
    }
  });
});




app.put('/assignments/:name/assignee/:assignee', function (request, response) {
  logic.examine(request, function (mail, jobtitle) {
    if (mail !== request.params.assignee && jobtitle.indexOf('Personeel') === -1) {
      response.sendStatus(401);
    } else {
      logs_logic.addLog(new Date().getTime(), `${mail} + heeft gebruiker met naam "${request.params.assignee}" toegekend aan opdracht met als naam "${request.params.name}".`, function () {
        response.status(200).json(logic.changeAssignee(request.params.name, request.params.assignee));
      });
    }
  });
});

app.put('/assignments/:name/status/:status', function (request, response) {
  logic.examine(request, function (mail, jobtitle) {
    if (jobtitle.indexOf('Personeel') === -1) {
      response.sendStatus(401);
    } else {
      logs_logic.addLog(new Date().getTime(), `${mail} heeft de status van opdracht met naam "${request.params.name}" veranderd.`, function () {
        response.status(200).json(logic.changeStatus(request.params.name, request.params.status));
      });
    }
  });
});

app.put('/messages/:sender/:timestamp/:read', function (request, response) {
  logic.examine(request, function (mail, jobtitle) {
    if (mail === undefined) {
      response.sendStatus(401);
    } else {
      response.status(200).json(messages_logic.changeRead(request.params.sender, request.params.timestamp, request.params.read));
    }
  });
});




app.delete('/request/:assignment/:user', function (request, response) {
  logic.examine(request, function (mail, jobtitle) {
    if (mail !== request.params.user && jobtitle.indexOf('Personeel') === -1) {
      response.sendStatus(401);
    } else {
      logs_logic.addLog(new Date().getTime(), `${mail} heeft de aanvraag voor opdracht met als naam "${request.params.assignment}" verwijderd.`, function () {
        response.status(200).json(logic.deleteRequest(request.params.assignment, request.params.user));
      });
    }
  });
});

app.delete('/domains/:domain', function (request, response) {
  logic.examine(request, function (mail, jobtitle) {
    if (jobtitle.indexOf('Personeel') === -1) {
      response.sendStatus(401);
    } else {
      response.status(200).json(logic.deleteDomain(request.params.domain));
    }
  });
});




app.listen(3000);