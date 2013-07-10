###*
  @fileoverview app.envelopes.Component
###
goog.provide 'du.timemanager.expense.Component'

goog.require 'du.timemanager.Model'
goog.require 'du.timemanager.expense.templates'
goog.require 'este.ui.Component'
goog.require 'este.storage.Rest'
goog.require 'este.dom.merge'

goog.require 'goog.ui.ac'
goog.require 'goog.ui.Textarea'
goog.require 'goog.i18n.DateTimeParse'
goog.require 'goog.ui.InputDatePicker'
goog.require 'goog.i18n.DateTimeSymbols'
goog.require 'goog.i18n.DateTimeSymbols_cs'

class du.timemanager.expense.Component extends este.ui.Component

  ###*
    @param {du.timemanager.Collection} timers
    @constructor
    @extends {este.ui.Component}
  ###
  constructor: (@timers) ->
    super()

  ###*
    @type {du.timemanager.Collection}
    @protected
  ###
  timers: null

  ###*
    @override
  ###
  enterDocument: ->
    super()
    @update()
    return

  ###*
    @override
  ###
  registerEvents: ->
    @on '.new-envelope', 'submit', @onNewTimeRecordSubmit
    @on @timers, 'update', @update

  ###*
    @param {este.events.SubmitEvent} e
    @protected
  ###
  onNewTimeRecordSubmit: (e) ->
    timeRecord = new du.timemanager.Model e.json
    errors = timeRecord.validate()
    if errors
      alert errors[0].getMsg()
      return
    model = new du.timemanager.Model e.json
    storage = new este.storage.Rest 'http://localhost:8000'
    result = storage.add model
    @timers.add result

  ###*
    @protected
  ###
  update: ->
    html = du.timemanager.expense.templates.element
      timers: @timers.toJson()
    @getElement().innerHTML = html
    textareaActivity = new goog.ui.Textarea('WTF')
    textareaTags = new goog.ui.Textarea('WTF')
    textareaActivity.decorate @getElement().querySelector '#descActivity'
    textareaTags.decorate @getElement().querySelector '#tags'
    datePattern = "dd'.'MM'.'yyyy"
    goog.i18n.DateTimeSymbols = goog.i18n.DateTimeSymbols_cs
    dateFormatter = new goog.i18n.DateTimeFormat datePattern
    dateParser = new goog.i18n.DateTimeParse datePattern
    dateFormat = new goog.ui.InputDatePicker dateFormatter, dateParser
    dateFormat.decorate @getElement().querySelector '#date'
    tagsProvider = [
      "SocialBakers"
      "QA"
      "Testování",
      "testReview"
    ]
    autocompleteTags = goog.ui.ac.createSimpleAutoComplete tagsProvider, @getElement().querySelector('#tags'), true, true
    return