var mongoose = require('mongoose');

var fields = {
	name: {type: String, required: true},
	description: {type: String},
	amount: {type: String, required: true}, 
    listTypes: {type: Array},
    updated: { type: Date, default: Date.now }
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

var Model = module.exports = mongoose.model('Movement', Schema);