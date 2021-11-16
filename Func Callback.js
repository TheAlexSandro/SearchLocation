// callback detection
  if (update.callback_query) {  
    return prosesCallback(update.callback_query)
  }

// function callback
function prosesCallback(cb) {
  var msg = cb.message;
}
