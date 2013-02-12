var Movement = require(process.cwd() + '/app/models/Movement'),
    Type = require(process.cwd() + '/app/models/Type'),
    cleanArray = require(process.cwd() + '/lib/filters/cleanArray'),
    auth = require(process.cwd() + '/lib/auth');

exports.index = function(req, res, next){
    auth.verify(req, res);
    if (!Movement.inSchema(req.du.fields)) {
        return next(400);
    }
    Movement.find({email: req.user.emails[0].value}, req.du.fields, function(err, docs) {
        if (err) return next(err);
        res.json(docs);
    });
};


exports.show = function(req, res, next){
  auth.verify(req, res);
    Type.find({email: req.user.emails[0].value}, function(err, docs){
      var types = docs.slice(),
          listTypes = req.movement.listTypes;
      for (var i = 0; i < docs.length; i++) {
        for (var y = 0; y < listTypes.length; y++) {
          if( listTypes[y]._id == docs[i]._id){
            delete types[i];
          }
        }
      }
      
      req.movement.listTypes = listTypes.concat(cleanArray(types));
      res.send(req.movement);
    });
};

exports.create = function(req, res, next){
    auth.verify(req, res);
    var movement = new Movement();
    movement.name = req.body.name;
    movement.description = req.body.description;
    movement.amount = req.body.amount;
    movement.listTypes = req.body.listTypes;
    movement.email = req.user.emails[0].value;
    movement.save(function(err, doc) {
        if (err) return next(err);
        res.json(doc);
    });
};

exports.update = function(req, res, next){
  auth.verify(req, res);
  req.movement.name = req.body.name;
  req.movement.description = req.body.description;
  req.movement.amount = req.body.amount;
  req.movement.listTypes = req.body.listTypes;
  req.movement.email = req.user.emails[0].value;
  req.movement.save(function(err, doc) {
    if (err) return next(err);
    res.json(doc);
  });
};

exports.destroy = function(req, res, next){
  auth.verify(req, res);
    req.movement.remove(function(err, doc) {
        if (err) return next(err);
        res.json(doc);
    });
};