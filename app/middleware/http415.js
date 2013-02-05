var UnsupportedMediaType = require(process.cwd() + '/lib/error').UnsupportedMediaType;

module.exports = function() {
  return function(req, res, next){
    var isPostOrPut = req.method === 'POST' || req.method === 'PUT';
    var isBody = typeof req.body !== 'undefined';
    if (isPostOrPut && isBody && !req.is('json')) {
      return next(new UnsupportedMediaType());
    }
    next();
  };
};