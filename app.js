var express = require('express')
	, resource = require('express-resource')
	, config = require('./config')
	, app = express();

// konfigurace a spojeni s databazi
config.configure(app);
config.connect(app);

module.exports = app;