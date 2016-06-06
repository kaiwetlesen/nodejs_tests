#!/usr/bin/env node

var http = require('http');
var employeeService = require('./lib/employees');
var responder = require('./lib/responseGenerator');
var staticFile = responder.staticFile('./public');

function respondToRequest(req, res) {
	var _url;

	req.method = req.method.toUpperCase();
	if (req.method !== 'GET') {
		res.writeHead(501, {'Content-Type': 'text/plain'});
		return res.end(req.method + ' is not implemented.');
	}

	if (_url = /^\/employees(\/)?$/i.exec(req.url)) {
		employeeService.getEmployees(function(error,data) {
			if (error) {
				// send 500 err
				return responder.send500(error, res);
			}
			else {
				// send 200 data
				return responder.sendJson(data, res);
			}
		});
	}
	else if (_url = /^\/employees\/(\d+)(\/)?$/i.exec(req.url)) {
		employeeService.getEmployee(_url[1], function(error, data) {
			if (error) {
				// send 500 error
				return responder.send500(error, res);
			}
			else if (!data) {
				// send 404 reply
				return responder.send404(res);
			}
			else {
				// Send 200 reply
				return responder.sendJson(data, res);
			}
		});
	}
	else {
		res.writeHead(200);
		res.end(staticFile(data, res));
	}
}

var server = http.createServer(respondToRequest);
server.listen(8080, 'localhost');
console.log("Server running.");
