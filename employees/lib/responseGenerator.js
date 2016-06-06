var fs = require('fs');

exports.send404 = function(response) {
	console.error("Could not find resource.");
	response.writeHead(404, {'Content-Type': 'text/plain'});
	response.end('Not found');
}

exports.send500 = function(data, response) {
	console.error(data.red);
	response.writeHead(500, {'Content-Type': 'text/plain'});
	response.end(data);
}

exports.sendJson = function(data, response) {
	response.writeHead(200, {'Content-Type': 'application/json'});
	response.end(JSON.stringify(data));
}

exports.staticFile = function(staticPath) {
	return function(data, response) {
		var readStream;

		data = data.replace(/^(\/home)(.html)?$/i, '$1.html');
		page = '.' + staticPath + data;

		fs.stat(data, function(error, stats) {
			if (error || stats.isDirectory()) {
				return exports.send404(response);
			}
			readStream = fs.createReadStream(data);
			return readStream.pipe(response);
		});
	}
}
