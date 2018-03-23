var logic = require('./logic.js');
var express = require('express');
var bodyParser = require('body-parser');
var qs = require('querystring');

logic.load();

var app = express();

app.use(bodyParser());

app.get('/balances/:user', function (request, response) {
  if (logic.login(request)) {
    logic.getBalance(request.params.user, function (result) {
      response.status(200).json({ name: request.params.user, amount: result });
    });
  } else {
    response.send(401);
  }
});

app.get('/assignments', function (request, response) {
  if (logic.login(request)) {
    response.status(200).json(logic.getAssignments());
  } else {
    response.send(401);
  }
});

app.get('/assignments/time/:time', function (request, response) {
  if (logic.login(request)) {
    response.status(200).json(logic.getAssignmentsByTime(request.params.time));
  } else {
    response.send(401);
  }
});

app.get('/request/student/:student', function (request, response) {
  if (logic.login(request)) {
    response.status(200).json(logic.getRequestsByStudent(request.params.student));
  } else {
    response.send(401);
  }
});

app.get('/request/lecturer/:lecturer', function (request, response) {
  if (logic.login(request)) {
    try {
      response.status(200).json(logic.getAssignmentsWithOpenRequests(request.params.lecturer));
    } catch (err) {
      response.send(400).json(err.message);
    }
  } else {
    response.send(401);
  }
});

app.get('/multiple/:value', function (request, response) {
  if (logic.login(request)) {
    try {
      response.status(200).json(logic.getMultiple(request.params.value));
    } catch (err) {
      response.send(400).json(err.message);
    }
  } else {
    response.send(401);
  }
});

app.get('/assignments/created/before/:timestamp', function (request, response) {
  if (logic.login(request)) {
    response.status(200).json(logic.getAssignmentsBeforeCreated(request.params.timestamp));
  } else {
    response.send(401);
  }
});

app.get('/assignments/created/after/:timestamp', function (request, response) {
  if (logic.login(request)) {
    response.status(200).json(logic.getAssignmentsAfterCreated(request.params.timestamp));
  } else {
    response.send(401);
  }
});

app.get('/assignments/performed/before/:timestamp', function (request, response) {
  if (logic.login(request)) {
    response.status(200).json(logic.getAssignmentsBeforePerformed(request.params.timestamp));
  } else {
    response.send(401);
  }
});

app.get('/assignments/performed/after/:timestamp', function (request, response) {
  if (logic.login(request)) {
    response.status(200).json(logic.getAssignmentsAfterPerformed(request.params.timestamp));
  } else {
    response.send(401);
  }
});

app.get('/assignments/exists/:name', function (request, response) {
  if (logic.login(request)) {
    response.status(200).json(logic.checkIfAssignmentExists(request.params.name));
  } else {
    response.send(401);
  }
});

app.get('/domains', function (request, response) {
  if (logic.login(request)) {
    response.status(200).json(logic.getDomains());
  } else {
    response.send(401);
  }
});

app.get('/domains/:domain/index', function (request, response) {
  if (logic.login(request)) {
    try {
      response.status(200).json(logic.getDomainIndex(request.params.domain));
    } catch (err) {
      response.status(400).json(err.message);
    }
  } else {
    response.send(401);
  }
});

app.get('/assignments/lecturer/:lecturer', function (request, response) {
  if (logic.login(request)) {
    response.status(200).json(logic.getAssignmentsByLecturer(request.params.lecturer));
  } else {
    response.send(401);
  }
});

app.get('/assignments/assignee/:assignee', function (request, response) {
  if (logic.login(request)) {
    response.status(200).json(logic.getAssignmentsByAssignee(request.params.assignee));
  } else {
    response.send(401);
  }
});

app.get('/assignments/status/:status', function (request, response) {
  if (logic.login(request)) {
    try {
      response.status(200).json(logic.getAssignmentsByStatus(request.params.status));
    } catch (err) {
      response.status(400).json(err.message);
    }
  } else {
    response.send(401);
  };
});

app.get('/assignments/domain/:domain', function (request, response) {
  if (logic.login(request)) {
    try {
      response.status(200).json(logic.getAssignmentsByDomain(request.params.domain));
    } catch (err) {
      response.status(400).json(err.message);
    }
  } else {
    response.send(401);
  }
});

app.get('/assignments/assignee/:assignee/domain/:domain', function (request, response) {
  if (logic.login(request)) {
    try {
      response.status(200).json(logic.getAssignmentsByAssigneeByDomain(request.params.assignee, request.params.domain));
    } catch (err) {
      response.status(400).json(err.message);
    }
  } else {
    response.send(401);
  }
});

app.get('/assignments/assignee/:assignee/status/:status', function (request, response) {
  if (logic.login(request)) {
    try {
      response.status(200).json(logic.getAssignmentsByAssigneeBystatus(request.params.assignee, request.params.status));
    } catch (err) {
      response.status(400).json(err.message);
    }
  } else {
    response.send(401);
  }
});

app.get('/assignments/assignee/:assignee/status/:status/domain/:domain', function (request, response) {
  if (logic.login(request)) {
    try {
      response.status(200).json(logic.getAssignmentsByAssigneeBystatusByDomain(request.params.assignee, request.params.status, request.params.domain));
    } catch (err) {
      response.status(400).json(err.message);
    }
  } else {
    response.send(401);
  }
});

app.get('/assignments/lecturer/:assignee/status/:status', function (request, response) {
  if (logic.login(request)) {
    try {
      response.status(200).json(logic.getAssignmentsBylecturerBystatus(request.params.lecturer, request.params.status));
    } catch (err) {
      response.status(400).json(err.message);
    }
  } else {
    response.send(401);
  }
});

app.get('/assignments/lecturer/:assignee/domain/:domain', function (request, response) {
  if (logic.login(request)) {
    try {
      response.status(200).json(logic.getAssignmentsBylecturerBydomain(request.params.lecturer, request.params.domain));
    } catch (err) {
      response.status(400).json(err.message);
    }
  } else {
    response.send(401);
  }
});

app.get('/assignments/search/:needle', function (request, response) {
  if (logic.login(request)) {
    response.status(200).json(logic.search(request.params.needle));
  } else {
    response.send(401);
  }
});

app.get('/assignments/open/:student', function (request, response) {
  if (logic.login(request)) {
    response.status(200).json(logic.getOpenAssignments(request.params.student));
  } else {
    response.send(401);
  }
});

app.get('/assignments/lecturer/:lecturer/status/:status/domain/:domain', function (request, response) {
  if (logic.login(request)) {
    try {
      response.status(200).json(logic.getAssignmentsBylecturerBystatusByDomain(request.params.lecturer, request.params.status, request.params.domain));
    } catch (err) {
      response.status(400).json(err.message);
    }
  } else {
    response.send(401);
  }
});




app.post('/balances', function (request, response) {
  if (logic.login(request)) {
    logic.setBalance(request.body.user, request.body.amount);
    response.send(201);
  } else {
    response.send(401);
  }
});

app.post('/assignments', function (request, response) {
  if (logic.login(request)) {
    try {
      logic.addAssignment(request.body);
      response.send(201);
    } catch (err) {
      response.status(400).json(err.message);
    }
  } else {
    response.send(401);
  }
});

app.post('/requests', function (request, response) {
  if (logic.login(request)) {
    try {
      logic.addRequest(request.body.assignment, request.body.user);
      response.send(201);
    } catch (err) {
      response.status(400).json(err.message);
    }
  } else {
    response.send(401);
  }
});

app.post('/domains', function (request, response) {
  if (logic.login(request)) {
    try {
      logic.setDomain(request.body.domain);
      response.sendStatus(201);
    } catch (err) {
      response.status(400).json(err.message);
    }
  } else {
    response.send(401);
  }
});




app.put('/assignments/:name/assignee/:assignee', function (request, response) {
  if (logic.login(request)) {
    try {
      logic.changeAssignee(request.params.name, request.params.assignee);
      response.send(201);
    } catch (err) {
      response.status(400).json(err.message);
    }
  } else {
    response.send(401);
  }
});

app.put('/assignments/:name/status/:status', function (request, response) {
  if (logic.login(request)) {
    logic.changeStatus(request.params.name, request.params.status);
    response.send(201);
  } else {
    response.send(401);
  }
});




app.delete('/request/:assignment/:user', function (request, response) {
  if (logic.login(request)) {
    try {
      logic.deleteRequest(request.params.assignment, request.params.user);
      response.send(200);
    } catch (err) {
      response.status(400).json(err.message);
    }
  } else {
    response.send(401);
  }
});

app.delete('/domains/:domain', function (request, response) {
  if (logic.login(request)) {
    logic.deleteDomain(request.params.domain);
    response.sendStatus(200);
  } else {
    response.send(401);
  }
});




app.listen(3000);