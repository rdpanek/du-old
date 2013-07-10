###*
  @fileoverview
###
goog.provide 'du.timemanager.listening.create'

goog.require 'du.timemanager.Collection'
goog.require 'du.timemanager.listening.Component'

###*
  @param {string} selector
  @return {du.timemanager.listening.Component}
###
du.timemanager.listening.create = (selector) ->
  timers = new du.timemanager.Collection
  component = new du.timemanager.listening.Component timers

  element = document.querySelector selector
  component.render element
  component
