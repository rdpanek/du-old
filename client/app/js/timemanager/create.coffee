###*
  @fileoverview
###
goog.provide 'du.timemanager.create'

goog.require 'du.timemanager.Collection'
goog.require 'du.timemanager.Component'

###*
  @param {string} selector
  @return {du.timemanager.Component}
###
du.timemanager.create = (selector) ->
  timers = new du.timemanager.Collection
  component = new du.timemanager.Component timers

  element = document.querySelector selector
  component.render element
  component
