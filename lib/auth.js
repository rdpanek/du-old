exports.verify = function(req, res){
	if( req.isAuthenticated() === false ){
		throw new Error('You must be logged');
	}
	console.log(req.isAuthenticated());
};