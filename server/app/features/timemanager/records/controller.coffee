TimeManagerRecords = require './model'
TimeManagerTags = require '../tags/model'
moment = require 'moment'
moment.lang 'cs'

exports.create = (req, res) ->
  # date format
  if (req.body.date.length > 0) && (moment(req.body.date, "MM.DD.YYYY").isValid() is yes)
    f = moment req.body.date, "DD-MM-YYYY"
    dateUnix = moment(f).format 'X'
  dateUnix ?= moment().format 'X'

  timeRecord = new TimeManagerRecords()
  timeRecord.dateUnix = dateUnix
  timeRecord.timeTotal = req.body.time
  timeRecord.descActivity = req.body.descActivity
  timeRecord.userHash = 12345
  timeRecord.save (err, timeRecord) ->
    res.send 404 if err

    #save tags
    tags = req.body.tags
    tags = tags.replace(/,$/, "").replace(/, $/, "")
    tags = tags.split(",")
    for tag in tags
      tagRecord = new TimeManagerTags()
      tagRecord.tagName = tag
      tagRecord.userHash = 12345
      tagRecord.timeRecord = timeRecord._id
      tagRecord.save (err, tag) ->

  res.json req.body
  res.send 201
  return

exports.index = (req, res) ->
  TimeManagerRecords.find {}, (err, doc)->
    res.json doc
    return
  return