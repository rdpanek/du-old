var request = require('supertest')
	,	app = require(process.cwd() + '/app')
	,	async = require('async')
	, 	Type = require(process.cwd() + '/app/models/Type');


// testovaci data
var types = [
	{name: 'Výdaj', color: '#336699', check: true},
	{name: 'Příjem', color: '#223344', check: true}
];

// vlozeni jednoho radku do databaze
function save(doc){
	return function(cb){
		var type = new Type();
		for (var field in doc){
			type[field] = doc[field];
		} 
		type.save(cb);
	}
}

describe('API type', function(){
	
	beforeEach(function(done) {
        Type.remove({}, function(err){
            if (err) return done(err);
            async.parallel([
                save(types[0]), save(types[1])
            ], done);
        }); 
    });

	describe('GET /api/v1/types', function(){
		it('Return collection containing two docs ', function(done){
			request(app)
			.get('/api/v1/types')
			.end(function(err, res){
				res.body.length.should.eql(2);
				res.body[0].should.include(types[0]);
				res.body[1].should.include(types[1]);
				done();
			});
    	});
    	it('Received only one column', function(){
    	   request(app)
    	   	.get('/api/v1/types?fields=name')
    	   	.expect(200)
    	   	.end(function(err, res){
    	   		res.body[0].name.should.eql(types[0].name);
    	   		res.body[0].should.not.include(
    	   				{color: '#336699', check: 'true'}
    	   			);
    	   	});
    	});
    	it('Received document contains name, color and check', function(done){
			request(app)
				.get('/api/v1/types')
				.end(function(err, res){
					res.body[0].name.should.eql(types[0].name);
					res.body[0].color.should.eql(types[0].color);
					res.body[0].check.should.eql(types[0].check);
					done();
				});
		});
		it('Content-Type Json', function(done){
			request(app)
				.get('/api/v1/types')
				.end(function(err, res){
					res.should.be.json;
					done();
				});
		});
		it('Received code 400, if the field does not exist in the document', function(done){
			request(app)
				.get('/api/v1/types?fields=abc')
				.expect(400, done);
		});
		it('Received code 406, when your request a different format than JSON', function(done){
			request(app)
				.get('/api/v1/types?fields=url')
				.set('Accept', 'application/xml')
				.expect(406, done);
		});
	});

	describe('GET /api/v1/types/:type', function () {
	  	it('Received detail one page', function (done) {
	    	request(app)
	    		.post('/api/v1/types/')
	    		.send(types[0])
	    		.end(function(err, res){
	    			if (err) return done(err);
	    			var id = res.header.location.split("/");
	    			id = id[id.length - 1];

	    			request(app)
	    				.get('/api/v1/types/' + id)
	    				.end(function(err, res){
	    					res.body.name.should.eql(types[0].name);
	    					res.body.color.should.eql(types[0].color);
	    					res.body.check.should.not.eql(types[0].check);
	    					done();
	    			});
    		});
	  	});
	  	it('Received 404 code, if the page was not found', function(done){
	  	   request(app)
	  	   		.get('/api/v1/types/51118339b237d00000000022')
	  	   		.expect(404, done);
	  	});
	});
	
	describe('POST /api/v1/types', function () {
	  it('New type is saved', function(done){
		   request(app)
		   	.post('/api/v1/types')
		   	.send(types[0])
		   	.end(function(err, res){
		   		res.should.have.status(201);
		   		res.should.have.header('location');
		   		Type.findOne(types[0], function(err, doc){
			     	doc.check.should.eql(types[0].check);
			     	doc.name.should.eql(types[0].name);
			     	doc.color.should.eql(types[0].color);
			     	done();
			     });
		   	});
		});
	  	it('Received 415 code, if the user send Content-type different json', function(done){
			request(app)
		     	.post('/api/v1/types')
		     	.set('Content-Type', 'application/xml')
	        	.send('<xml>pes</xml>')
		     	.expect(415, done);
	  	});
	  	it('Received 400 code, if the user send blank doc', function(done){
	  	   	request(app)
	  	   		.post('/api/v1/types')
	  	   		.send({})
	  	   		.expect(400, done);
	  	});
	});

	describe('PUT /api/v1/types/:type', function () {
	  	it('Editing page', function (done) {
			Type.find({}, function(err, doc){
				if (err) return done(err);
				request(app)
					.put('/api/v1/types/' + doc[0]._id)
					.send({
						name: "Aktualizace"
					})
					.expect(200)
					.end(function(err, res){
						if (err) return done(err);
						Type.find({
							name: "Aktualizace"
						}, function(err, doc){
							if (err) return done(err);
							doc[0].name.should.eql("Aktualizace");
							done();
						});
					});
			});
		});
		it('Received 400 code, if the user send blank doc', function(done){
		   Type.find({}, function(err, res){
		   		if(err) return done(err);
		   		request(app)
		   			.put('/api/v1/types/' + res[0]._id)
		   			.send({})
		   			.expect(400, done);
		   });
		});
		it('Received 404 code, if the page do not exists', function(done){
		   request(app)
		   	.put('/api/v1/types/51118339b237d00000000022')
		   	.send(types[0])
		   	.expect(404, done);
	   	});
	   	it('Received 415 code, if the user send Content-type different json', function(done){
	   	   Type.find({}, function(err, res){
		   		if(err) return done(err);
		   		request(app)
		   			.put('/api/v1/types/' + res[0]._id)
		   			.send('<xml>dog</xml>')
					.set('Content-Type', 'application/xml')
		   			.expect(415, done);
		   });
	   	});
	});

	describe('DELETE /api/v1/types', function () {
	  it('Collection types do not remove', function (done) {
	    request(app)
	    	.del('/api/v1/types')
	    	.expect(404, done);
	  });
	});

	describe('DELETE /api/v1/types/:type', function () {
	  	it('Page can be deeleted', function (done) {
		    Type.find({}, function(err, res){
		    	if(err) return done(err);
		    	request(app)
		    		.del('/api/v1/types/' + res[0]._id)
		    		.expect(204, done);
	    	});

	  	});
	  	it('Received 404 code, if the page does not exist', function(done){
	       request(app)
	       	.del('/api/v1/types/51118339b237d00000000022')
	       	.expect(404, done);
	    });
	});
});