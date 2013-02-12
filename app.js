var express = require('express')
	, resource = require('express-resource')
	, config = require('./config')
	, app = express();

// konfigurace a spojeni s databazi
config.configure(app);
config.connect(app);

var TypeController = require('./app/controllers/TypeController');
var TypeModel = require('./app/models/Type');
var MovementController = require('./app/controllers/MovementController');
var MovementModel = require('./app/models/Movement');
var LoginController;

app.resource('types', TypeController, {base: '/api/v1/', load: TypeModel.findOneByUrl});
app.resource('movements', MovementController, {base: '/api/v1/', load: MovementModel.findOneByUrl});

module.exports = app;