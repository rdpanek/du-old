var mongoose = require('mongoose');

var fields = {
	name: {type: String, required: true},
	color: {type: String},
    check: {type: Boolean, required: true},
    email: {type: String, required: true},
	default: {type: Boolean}
};

var Schema = new mongoose.Schema(fields);

Schema.statics.findOneByUrl = function(_id, cb){
	Model.findOne({_id: _id}, cb);
};

Schema.statics.inSchema = function(obj) {
    for (var field in obj) {
        if (typeof fields[field] === 'undefined') {
            return false;
        }
    }
    return true;
};

var Model = module.exports = mongoose.model('Type', Schema);