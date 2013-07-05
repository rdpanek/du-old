TimeManager = require './timemanagermodel'
moment = require 'moment'
moment.lang 'cs'

exports.create = (req, res) ->
  # date format
  if (req.body.date.length > 0) && (moment(req.body.date, "MM.DD.YYYY").isValid() is yes)
    f = moment req.body.date, "DD-MM-YYYY"
    dateUnix = moment(f).format 'X'
  dateUnix ?= moment().format 'X'

  timeRecord = new TimeManager()
  timeRecord.dateUnix = dateUnix
  timeRecord.timeTotal = req.body.time
  timeRecord.tags = req.body.tags
  timeRecord.descActivity = req.body.descActivity
  timeRecord.userHash = 12345
  timeRecord.save (err, timeRecord)->
    console.log err
    #console.log timeRecord

  res.json req.body
  res.send 201
  return

exports.index = (req, res) ->
  TimeManager.find {}, (err, doc)->
    res.json doc
    return
  return