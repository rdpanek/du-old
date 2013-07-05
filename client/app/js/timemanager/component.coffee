###*
  @fileoverview app.envelopes.Component
###
goog.provide 'du.timemanager.Component'

goog.require 'du.timemanager.Model'
goog.require 'du.timemanager.templates'
goog.require 'este.ui.Component'
goog.require 'este.storage.Rest'
goog.require 'este.dom.merge'

goog.require 'goog.ui.Textarea'

class du.timemanager.Component extends este.ui.Component

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

    storage = new este.storage.Rest 'http://localhost:8000'
    model = new du.timemanager.Model e.json
    result = storage.add model

    @timers.add timeRecord

  ###*
    @protected
  ###
  update: ->
    html = du.timemanager.templates.element
      timers: @timers.toJson()
    @getElement().innerHTML = html
    textarea = new goog.ui.Textarea('WTF')
    textarea.decorate @getElement().querySelector '#descActivity'