var mongoose = require('mongoose');

var fields = {
	name: {type: String, required: true},
	description: {type: String},
	amount: {type: String, required: true}, 
    listTypes: {type: Array}
};

var Schema = new mongoose.Schema(fields);

Schema.statics.findOneByUrl = function(name, cb){
	Model.findOne({name: name}, cb);
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