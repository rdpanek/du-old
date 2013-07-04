###*
  @fileoverview Collection representing list of timemanagers models.
###
goog.provide 'du.timemanager.Collection'

goog.require 'du.timemanager.Model'
goog.require 'este.Collection'

class du.timemanager.Collection extends este.Collection

  ###*
    @param {Array=} array
    @constructor
    @extends {este.Collection}
  ###
  constructor: (array) ->
    super array

  ###*
    @override
  ###
  model: du.timemanager.Model