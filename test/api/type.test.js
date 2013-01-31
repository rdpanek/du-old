var request = require('supertest')
	,	app = require(process.cwd() + '/app')
	,	async = require('async')
	, 	Type = require(process.cwd() + '/app/models/Type');


// testovaci data
var data = [
	{name: 'Výdaj', color: '#336699'},
	{name: 'Příjem', color: '#223344.'}
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
                save(data[0]), save(data[1])
            ], done);
        }); 
    });

	describe('GET /api/v1/types', function(){
		it('List all types', function(done){
			request(app)
			.get('/api/v1/types')
			.end(function(err, res){
				res.body.length.should.eql(2);
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
		it('Received document contains name and color', function(done){
			request(app)
				.get('/api/v1/types')
				.end(function(err, res){
					res.body[0].name.should.eql(data[0].name);
					res.body[0].color.should.eql(data[0].color);
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
});