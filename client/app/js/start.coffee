###*
  @fileoverview Este app boilerplate. This example demonstrates a simple
  TodoMVC component. To see full TodoMVC app, check:
  este/bower_components/este-library/este/demos/app/todomvc/index.html.
###

# This is how we provide namespaces.
goog.provide 'app.start'

# Let's require what our app needs.
goog.require 'du.timemanager.expense.create'

###*
  App main entry point. This function should be called before body closing tag.
  @param {Object} data Server side JSON data.
###
app.start = (data) ->
  du.timemanager.expense.create '#expense'

# Ensures the symbol will be visible after compiler renaming.
goog.exportSymbol 'app.start', app.start