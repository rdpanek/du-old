###*
  @fileoverview
###
goog.provide 'du.timemanager.Model'

goog.require 'este.Model'

class du.timemanager.Model extends este.Model
  ###*
    @param {Object=} json
    @constructor
    @extends {este.Model}
  ###
  constructor: (json) ->
    super json

  ###*
    @override
  ###
  url: '/timemanager'

  ###*
    @override
  ###
  defaults:
    'time': ''

  ###*
    @override
  ###
  schema:
    'time':
      'set': este.model.setters.trim
      'validators': [
        este.validators.required()
      ]


