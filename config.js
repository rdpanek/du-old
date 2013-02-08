var express = require('express')
	, mongoose = require('mongoose');

exports.configure = function(app) {
	app.configure(function(){
		app.use(express.bodyParser());
		app.use(express.methodOverride());
		app.use(express.static(process.cwd() + '/angular-seed/app'));
		app.use(express.static(process.cwd() + '/angular-seed/test'));
		app.use(require('./app/middleware/fields')());
		app.use(require('./app/middleware/http406')());
		app.use(require('./app/middleware/http415')());
		app.use(app.router);
		app.use(require('./app/middleware/error')());
	});
	app.configure('development', function(){
		app.set('db uri', 'mongodb://localhost/du');
	});
	app.configure('production', function(){
        app.set('db uri', 'mongodb://panekdu:panekdu@linus.mongohq.com:10084/app11565455');
    });
    app.configure('test', function(){
		app.set('db uri', 'mongodb://localhost/dutest');
	});
}


exports.connect = function(app) {
    mongoose.connect(app.get('db uri'), function(err) {
        if(err) console.log("Mongo: " + err);
    });
}