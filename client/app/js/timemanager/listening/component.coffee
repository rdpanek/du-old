###*
  @fileoverview app.envelopes.Component
###
goog.provide 'du.timemanager.listening.Component'

goog.require 'du.timemanager.Model'
goog.require 'du.timemanager.listening.templates'
goog.require 'este.ui.Component'
goog.require 'este.storage.Rest'
goog.require 'este.dom.merge'

class du.timemanager.listening.Component extends este.ui.Component

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
    @protected
  ###
  update: ->
    storage = new este.storage.Rest 'http://localhost:8000'
    t = storage.load new du.timemanager.Model
    t.html = @getElement()
    goog.result.waitOnSuccess t, et = (resultValue)->
      console.log resultValue
      html = du.timemanager.listening.templates.element
        items: resultValue
      t.html.innerHTML = html
      return