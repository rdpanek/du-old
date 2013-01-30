var express = require('express')
	, resource = require('express-resource')
	, config = require('./config')
	, app = express();

// konfigurace a spojeni s databazi
config.configure(app);
config.connect(app);

var TypeController = require('./app/controllers/TypeController');
var TypeModel = require('./app/models/Type');

app.resource('types', TypeController, {base: '/api/v1/', load: TypeModel.findOneByUrl});


module.exports = app;