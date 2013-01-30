var Movement = require(process.cwd() + '/app/models/Movement');

exports.index = function(req, res, next){
    if (!Movement.inSchema(req.du.fields)) {
        return next(400);
    }
    Movement.find({}, req.du.fields, function(err, docs) {
        if (err) return next(err);
        res.json(docs);
    });
};


exports.show = function(req, res, next){
    res.send(req.movement);
};

exports.create = function(req, res, next){
    var movement = new Movement();
    movement.name = req.body.name;
    movement.description = req.body.description;
    movement.amount = req.body.amount;
    movement.save(function(err, doc) {
        if (err) return next(err);
        res.json(doc);
    });
};

exports.destroy = function(req, res, next){
    req.movement.remove(function(err, doc) {
        if (err) return next(err);
        res.json(doc);
    });
};