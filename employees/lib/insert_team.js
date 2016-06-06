#!/usr/bin/env node

var mongoose = require('mongoose');
var db = mongoose.connection;
var Schema = mongoose.Schema;

var dbUrl = 'mongodb://localhost/hr';

var TeamSchema = new Schema({
	name: {
		type: String,
		required: true
	}
});

var Team = mongoose.model('Team', TeamSchema);

db.on('error', function() {
	console.log('Database communication error!');
});

mongoose.connect(dbUrl, function(err) {
	if (err) {
		return console.log('Failed to connect to the database!\n    Reason: ' + err);
	}
	console.log('Connection succeeded!');

	Team.create([
		{name: 'Research and Discovery'},
		{name: 'Development Operations'},
		{name: 'Systems Manufacturing'}
	], function(error, rnd, devops, syman) {
		if (error) {
			console.log(error);
		}
		else {
			console.dir(rnd);
			console.dir(devops);
			console.dir(syman);
		}

		db.close();
		process.exit();
	});
});
