var request = require('supertest')
	,	app = require(process.cwd() + '/app')
	,	async = require('async')
	, 	Movement = require(process.cwd() + '/app/models/Movement');


// testovaci data
var data = [
	{name: 'Oprava skla', description: 'Pád ledu', amount: '10000'},
	{name: 'Oprava prahu', description: 'Prorazeny pl.', amount: '750'}
];

// vlozeni jednoho radku do databaze
function save(doc){
	return function(cb){
		var movement = new Movement();
		for (var field in doc){
			movement[field] = doc[field];
		} 
		movement.save(cb);
	}
}

describe('API movements', function(){
	
	beforeEach(function(done) {
        Movement.remove({}, function(err){
            if (err) return done(err);
            async.parallel([
                save(data[0]), save(data[1])
            ], done);
        }); 
    });

	describe('GET /api/v1/movements', function(){
		it('List all movements', function(done){
			request(app)
			.get('/api/v1/movements')
			.expect(200)
			.end(function(err, res){
				res.body.length.should.eql(2);
				done();
			});
    	});
    	it('Content-Type Json', function(done){
			request(app)
				.get('/api/v1/movements')
				.expect(200)
				.end(function(err, res){
					res.should.be.json;
					done();
				});
		});
		it('Received document contains name, description, amount', function(done){
			request(app)
				.get('/api/v1/movements')
				.expect(200)
				.end(function(err, res){
					res.body[0].name.should.eql(data[0].name);
					res.body[0].description.should.eql(data[0].description);
					res.body[0].amount.should.eql(data[0].amount);
					done();
				});
		});
		it('Received code 400, if the field does not exist in the document', function(done){
			request(app)
				.get('/api/v1/movements?fields=abc')
				.expect(400, done);
		});
		it('Received code 406, when your request a different format than JSON', function(done){
			request(app)
				.get('/api/v1/movements?fields=url')
				.set('Accept', 'application/xml')
				.expect(406, done);
		});
	});
});