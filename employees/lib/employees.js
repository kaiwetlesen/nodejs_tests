var employeeDb = require('../database/employees');
var mongoose = require('mongoose');
var db = mongoose.connection;
var Schema = mongoose.Schema;

var dbUrl = 'mongodb://localhost/hr';

exports.getEmployees = getEmployees;
exports.getEmployee = getEmployee;

var TeamSchema = new Schema({
	name: {
		type: String,
		required: true
	}
});

var Team = mongoose.model('Team', TeamSchema);

var EmployeeSchema = new Schema({
	name: {
		first: {
			type: String,
			required: true
		},
		middle: {
			type: String,
			required: false
		},
		last: {
			type: String,
			required: true
		}
	},
	team: {
		type: Schema.Types.ObjectId,
		ref: 'Team'
	},
	image: {
		type: String,
		default: 'images/user.png'
	},
	address: {
		lines: {
			type: [String]
		},
		postal: {
			type: String
		}
	}
});

var Employee = mongoose.model('Employee', EmployeeSchema);

function getEmployees(callback) {
	setTimeout(function() {
		callback(null, employeeDb);
	}, 500);
}

function getEmployee(eNo, callback) {
	getEmployees(function(error, data) {
		if (error) {
			return callback(error);
		}
		var result = data.find(function(item) {
			return item.id === eNo;
		});

		callback(null, result);
	});
}
