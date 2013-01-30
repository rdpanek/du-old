module.exports = function() {
    return function(req, res, next){
        if (!req.du) req.du = {};
        req.du.fields = {};
        if (req.query.fields) {
            req.query.fields.split(',').forEach(function(field){
                if (field.trim() !== '') {
                    req.du.fields[field] = 1;    
                }
            });
        }
        next();
    }
};