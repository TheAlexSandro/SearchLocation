var user = new jevrin.user()

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

        var pHasil = "Result of: " + cck + ""
        var esan = "<code>" + address + "</code>"
        var link = 'https://maps.google.com/maps?q=' + latitude + ',' + longitude + '&ll=' + latitude + ',' + longitude + '&z=16'
        var traf = 'https://www.google.com/maps/@' + latitude + ',' + longitude + ',13z/data=!5m1!1e1'
        var ddg = "https://duckduckgo.com/?q=" + latitude + "," + longitude + "&iaxm=maps"
        var waze = "https://www.waze.com/ul?ll=" + latitude + "," + longitude + ""
        var here = "https://share.here.com/l/" + latitude + "," + longitude + "?p=yes"
        var keyb = []

        keyb[0] = [
          tg.button.text('🌎 Open With...', 'open_with')
        ]
        keyb[1] = [
          tg.button.url('🚦 View Traffic Conditions', 'https://www.google.com/maps/@' + latitude + ',' + longitude + ',13z/data=!5m1!1e1')
        ]
        keyb[2] = [
          tg.button.text('📁 Save As Address', 'svAddres')
        ]

        user.setValue('esan_' + msg.chat.id, esan)
        user.setValue('link_' + msg.chat.id, link)
        user.setValue('traf_' + msg.chat.id, traf)
        user.setValue('ddg_' + msg.chat.id, ddg)
        user.setValue('waze_' + msg.chat.id, waze)
        user.setValue('here_' + msg.chat.id, here)

        tg.sendMsg(msg, pHasil, 'html', true, msg.message_id)
        tg.sendVenue(msg.chat.id, latitude, longitude, false, false, false)
        tg.sendMsgKeyboardInline(msg, esan, keyb, 'html')
        return;

      }
