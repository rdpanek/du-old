###*
  @fileoverview
###
goog.provide 'du.timemanager.expense.create'

goog.require 'du.timemanager.Collection'
goog.require 'du.timemanager.expense.Component'

###*
  @param {string} selector
  @return {du.timemanager.expense.Component}
###
du.timemanager.expense.create = (selector) ->
  timers = new du.timemanager.Collection
  component = new du.timemanager.expense.Component timers

  element = document.querySelector selector
  component.render element
  component
