mongoose = require 'mongoose'

fields =
  dateUnix:
    type: Number
    required: true
  timeTotal:
    type: Number
    required: true
  tags:
    type: Array
    required: true
  descActivity:
    type: Array
    required: true
  userHash:
    type: String
    required: true


Schema = new mongoose.Schema fields

Model = module.exports = mongoose.model 'TimeManager', Schema