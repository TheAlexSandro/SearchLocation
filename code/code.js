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

if (msg.text) {

var user = new telegram.user()

 var pola = /^[\/!](lok|loc) ([\w\s,\.]{3,})/i;
    if (cocok = pola.exec(msg.text)) {
      var cck = msg.text.replace(cocok[1], '');
      
      var geocoder = Maps.newGeocoder().setLanguage('en');
      var response = geocoder.geocode(cocok[2]);

      if (response.status !== 'OK') return tg.sendMsg(msg, '⚠️ <a href="tg://user?id=2085338522">Location not found</a>.', 'HTML', false, msg.message_id);

      var Lokasi = response.results[0];

      var address = Lokasi.formatted_address;
      var latitude = Lokasi.geometry.location.lat;
      var longitude = Lokasi.geometry.location.lng;
        
      var title = 'Location ⬇️';

      var hasil = tg.sendMsg(msg, "⏳ Searching...", 'html')
      var newMsg = hasil.result;
      var pHasil = "Result of: " + cck + ""
      var esan = "<code>" + address + "</code>"
      var keyb = []

      keyb[0] = [
        tg.button.url('🌎 Open With Google Maps', 'https://maps.google.com/maps?q=' + latitude + ',' + longitude + '&ll=' + latitude + ',' + longitude + '&z=16')
      ]
      keyb[1] = [
        tg.button.url('🚦 View Traffic Conditions', 'https://www.google.com/maps/@' + latitude + ',' + longitude + ',13z/data=!5m1!1e1')
      ]
      keyb[2] = [
        tg.button.text('📁 Save As Address', 'svAddres')
      ]

      user.setValue('esan_'+msg.chat.id, esan)

      tg.util.sleep(1400)
      tg.editMessageText(msg.chat.id, newMsg.message_id, newMsg.inline_message_id, pHasil, 'html', true)
      tg.sendVenue(msg.chat.id, latitude, longitude, false, false, false)
      tg.sendMsgKeyboardInline(msg, esan, keyb, 'html')
      return;
}

// SEARCH GEOMETRY

var pola = /^[\/!](geo) ([\w\s,\.]{3,})/i;
    if (cocok = pola.exec(msg.text)) {
      var cck = msg.text.replace(cocok[1], '');
      
      var geocoder = Maps.newGeocoder().setLanguage('en');
      var response = geocoder.geocode(cocok[2]);

      if (response.status !== 'OK') return tg.sendMsg(msg, '⚠️ <a href="tg://user?id=2085338522">Location not found</a>.', 'HTML', false, msg.message_id);
      
      var Lokasi = response.results[0];
     
      var title = 'Location ⬇️';

      var address = Lokasi.formatted_address;
      var latitude = Lokasi.geometry.location.lat;
      var longitude = Lokasi.geometry.location.lng;

      var hasil = tg.sendMsg(msg, "⏳ Searching...", 'html')
      var newMsg = hasil.result;
      var pHasil = "Result of: " + cck + ""
      var psn = "Position geometry:"
      psn += "\n\n<b>Lat:</b> <code>" + latitude + "</code>"
      psn += "\n<b>Long:</b> <code>" + longitude + "</code>"
      psn += "\n\nTo get addres type:\n<code>/loc " + latitude + ", " + longitude + "</code>"
      var keyb = []

      keyb[0] = [
        tg.button.text('What is this?', 'me_err2')
      ]

      tg.util.sleep(1400)
      tg.editMessageText(msg.chat.id, newMsg.message_id, newMsg.inline_message_id, pHasil, 'html', true)
      tg.sendMsgKeyboardInline(msg, psn, keyb, 'HTML');
      return;
        
    }

if (cocok = /^([\/]setaddress )/i.exec(msg.text)){
  var pesanWelcome = msg.text.replace(cocok[1],'');

  try {

    tg.sendMsg(msg, '✅ <b>Done</b>\nYour address have been save.\nTo check it, send /myaddress', 'HTML', false);
    
    return user.setValue('pesanWelcome_'+msg.chat.id, pesanWelcome);

  } catch (e) {
    var pesanError = e.message;
    
    if (error = /({(?:.*)})/gmi.exec(pesanError) )
    pesanError = error[1];        

    tg.sendMsg(msg, '⛔️ ERROR: '+pesanError, false, false, msg.message_id);
  }
  
  return;
}

var pola = /^[!\/]myaddress$/i;
if (pola.exec(msg.text) ){

  var pesanWelcome = user.getValue('pesanWelcome_'+msg.chat.id);
  
  // If it doesn't exist/hasn't set the address
  if (!pesanWelcome) return tg.sendMsg(msg, "⚠️ You haven't saved the address at all.\nTo save use the following format:\n/setaddress your address", false, false, msg.message_id);
  
  var psn = "Your address is: <code>"+pesanWelcome+"</code>"
  psn += "\n\n<b>To get location use:</b>"
  psn += "\n<code>/loc "+pesanWelcome+"</code>"
  var keyb = []

  keyb[0] = [
    tg.button.text('✏️ Edit Address', 'edit_address'),
    tg.button.text('❌ Close', 'me_del')
  ]

  return tg.sendMsgKeyboardInline(msg, psn, keyb, 'html')
}
