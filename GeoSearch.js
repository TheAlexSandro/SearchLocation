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
