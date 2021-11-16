// callback detection
  if (update.callback_query) {   
    return prosesCallback(update.callback_query)
  }

// function for callback
function prosesCallback(cb) {
  var msg = cb.message;
  var user = new telegram.user()
}
