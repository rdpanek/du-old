var express = require('express')
	, mongoose = require('mongoose')
	, passport = require('passport')
  	, GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// API Access link for creating client ID and secret:
// https://code.google.com/apis/console/
var GOOGLE_CLIENT_ID = "521642543706.apps.googleusercontent.com";
var GOOGLE_CLIENT_SECRET = "Wfnxh4tWf2aTCxPyOeyqI5sx";

// Passport session setup.
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

// Use the GoogleStrategy within Passport.
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://panek-du.herokuapp.com/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      return done(null, profile);
    });
  }
));

exports.configure = function(app) {
	app.configure(function(){
		app.use(express.cookieParser());
		app.use(express.bodyParser());
		app.use(express.methodOverride());
		app.use(express.session({ secret: 'keyboard cat' }));
		app.use(passport.initialize());
  		app.use(passport.session());
  		app.use(express.static(process.cwd() + '/angular-seed/app'));
		app.use(express.static(process.cwd() + '/angular-seed/test'));
		app.use(require('./app/middleware/fields')());
		app.use(require('./app/middleware/http406')());
		app.use(require('./app/middleware/http415')());
		app.use(app.router);
		app.use(require('./app/middleware/error')());
	});
	app.configure('development', function(req, res){
		app.set('db uri', 'mongodb://localhost/du');
	});
	app.configure('production', function(){
        app.set('db uri', 'mongodb://panekdu:panekdu@linus.mongohq.com:10084/app11565455');
    });
    app.configure('test', function(){
		app.set('db uri', 'mongodb://localhost/dutest');
	});

	app.get('/auth/google',
	  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/userinfo.profile',
	                                            'https://www.googleapis.com/auth/userinfo.email'] }),
	  function(req, res){
	    // The request will be redirected to Google for authentication, so this
	    // function will not be called.
	  });

	app.get('/auth/google/callback', 
	  passport.authenticate('google', { failureRedirect: '/login' }),
	  function(req, res) {
	    res.redirect('/');
	});

	app.get('/logout', function(req, res){
	  req.logout();
	  res.redirect('/');
	});

	app.get('/login', function(req, res){
		res.send('<a href="/auth/google">Google</a>');
	});
}

exports.connect = function(app) {
    mongoose.connect(app.get('db uri'), function(err) {
        if(err) console.log("Mongo: " + err);
    });
}