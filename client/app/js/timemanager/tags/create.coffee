###*
  @fileoverview
###
goog.provide 'du.timemanager.tags.create'

goog.require 'du.timemanager.tags.Collection'
goog.reauire 'du.timemanager.tags.Component'

###*
  @param {string} selector
  @return {du.timemanager.tags.Component}
###
du.timemanager.tags.create = (selector) ->
  collection = new du.timemanager.tags.Collection
  component = new du.timemanager.tags.Component collection

  element = document.querySelector selector
  component.render element
  component