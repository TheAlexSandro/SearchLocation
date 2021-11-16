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
