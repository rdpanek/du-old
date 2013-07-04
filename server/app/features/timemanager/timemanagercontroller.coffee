model = require './timemanagermodel'

exports.create = (req, res) ->
  res.json req.body
  res.send 201
  return