mongoose = require 'mongoose'

fields =
  dateStart:
    type: Date
    require: true
    default: Date.now
  timeStart:
    type: Number
    require: true
  timeEnd:
    type: Number
    require: true
  projectName:
    type: String
    require: true
  descActivity:
    type: String
    require: true
  email:
    type: String
    require: true


Schema = new mongoose.Schema fields

Model = module.exports = mongoose.model 'TimeManager', Schema