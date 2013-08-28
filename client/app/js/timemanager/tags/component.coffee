###*
  @fileoverview app.envelopes.Component
###
goog.provide 'du.timemanager.tags.Component'

goog.require 'du.timemanager.tags.Model'
goog.require 'du.timemanager.tags.templates'
goog.require 'este.ui.Component'
goog.require 'este.storage.Rest'
goog.require 'este.dom.merge'

class du.timemanager.tags.Component extends este.ui.Component

  ###*
    @constructor
    @extends {este.ui.Component}
  ###
  constructor: () ->
    super()

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
      html = du.timemanager.listening.templates.element
        items: resultValue
      t.html.innerHTML = html
      return