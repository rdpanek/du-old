mongoose = require 'mongoose'

fields =
  dateUnix:
    type: Number
    required: true
  timeTotal:
    type: Number
    required: true
  descActivity:
    type: String
    required: true
  userHash:
    type: String
    required: true


Schema = new mongoose.Schema fields

Model = module.exports = mongoose.model 'TimeManagerRecords', Schema