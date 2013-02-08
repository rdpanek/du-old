var Type = require(process.cwd() + '/app/models/Type');
var error = require(process.cwd() + '/lib/error');
var util = require(process.cwd() + '/lib/util');


exports.index = function(req, res, next){
    if (!Type.inSchema(req.du.fields)) {
        return next(new error.NotInFields());
    }
    Type.find({}, req.du.fields, function(err, docs) {
        if (err) return next(err);
        res.json(docs);
    });
};


exports.show = function(req, res, next){
    res.send(req.type);
};

exports.create = function(req, res, next){
    var type = new Type();

    if (req.body.color === undefined) {
        req.body.color = "white";
    };

    type.name = req.body.name;
    type.color = req.body.color;
    type.check = false;
    type.save(function(err, doc) {
        if (err) return next(err);
        var location = util.fullUrl(req.path + '/' + doc._id, req);
        res.setHeader('location', location);
        res.send(201);
        res.json(doc);
    });
};

exports.update = function(req, res, next){
  req.type.name = req.body.name;
  req.type.color = req.body.color;
  req.type.save(function(err, doc) {
    if (err) return next(err);
    res.json(doc);
  });
};

exports.destroy = function(req, res, next){
    req.type.remove(function(err, doc) {
        if (err) return next(err);
        res.send(204);
    });
};