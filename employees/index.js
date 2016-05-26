#!/usr/bin/env node

var http = require('http');


function respondToRequest(req, res) {
	var _url;

	req.method = req.method.toUpperCase();
	console.log("Request method: " + req.method);
	console.log("Requesting resource: " + req.url);

	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('The time is: ' + Date.now());
}

var server = http.createServer(respondToRequest);
server.listen(8080, 'localhost');
console.log("Server running.");
