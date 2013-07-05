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
    'date':
      'set': este.model.setters.trim
      'validators': [
        este.validators.format /^(\d{1,2}).(\d{1,2}).(\d{4})$/, getMsg = -> 'Datum uveďte ve formátu den.měsíc.rok'
      ]
    'time':
      'set': este.model.setters.trim
      'validators': [
        este.validators.required getMsg = -> 'Je potřeba uvést čas.'
        este.validators.number getMsg = -> 'Zadejte prosím jen číslice.'
        este.validators.maxLength 4, getMsg = -> 'Zadejte pouze čtyřmístný časový údaj, např: 1200 představující 12h 00m'
      ]
    'tags':
      'validators': [
        este.validators.required getMsg = -> 'Je potřeba uvést alespoň jeden tag.'
      ]