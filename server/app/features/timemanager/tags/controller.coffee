TimeManagerTags = require '../tags/model'

exports.index = (req, res) ->
  TimeManagerTags.find {}, (err, tags) ->
    res.json tags
    return
  return