mongoose = require 'mongoose'

fields =
  tagName:
    type: String
    required: true
  userHash:
    type: String
    required: true
  timeRecord:
    type: String
    required: true

Schema = new mongoose.Schema fields

Model = module.exports = mongoose.model 'TimeManagerTags', Schema