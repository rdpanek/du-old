var Type = require(process.cwd() + '/app/models/Type');

exports.index = function(req, res, next){
    if (!Type.inSchema(req.du.fields)) {
        return next(400);
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
        res.json(doc);
    });
};