function doGet(e) {
  return tg.util.outputText("Hanya data POST yang kita proses yak!");
}

function doPost(e) {  
  var update = tg.doPost(e);
  
  if (update) {
    prosesPesan(update);
  } 
  
}

function prosesPesan(update) {
  if (update.message) {

    var msg = update.message;
  }
