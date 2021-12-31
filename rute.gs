pola = /^[\/!](rute) (.*) to (.*)/i;
  if (pola.exec(msg.text)) {
    var cocok = msg.text.match(pola);

    var dari = cocok[2];
    var tujuan = cocok[3];

    var response = Maps.newDirectionFinder()
    .setOrigin(dari)
    .setDestination(tujuan)

    .setMode(Maps.DirectionFinder.Mode.DRIVING)

    .setLanguage('en')

    .getDirections();

    if (response.status !== 'OK') return tg.sendMsg(msg, "⚠️ <a href='tg://user?id=2085338522'>Location not found</a>.", 'HTML', false, msg.message_id);

    var route = response.routes[0];

    var markerSize = Maps.StaticMap.MarkerSize.MID;
    var markerColor = Maps.StaticMap.Color.RED
    var markerLetterCode = 'A'.charCodeAt();

    var map = Maps.newStaticMap();
    for (var i = 0; i < route.legs.length; i++) {
        var leg = route.legs[i];
        if (i == 0) {
            // menambahkan penanda di lokasi mulai
            map.setMarkerStyle(markerSize, markerColor, String.fromCharCode(markerLetterCode));
            map.addMarker(leg.start_location.lat, leg.start_location.lng);
            markerLetterCode++;
        }
        map.setMarkerStyle(markerSize, markerColor, String.fromCharCode(markerLetterCode));
        map.addMarker(leg.end_location.lat, leg.end_location.lng);
        markerLetterCode++;
    }

    map.addPath(route.overview_polyline.points);

    var mulai = route.legs[0].start_address;
    var mulaiC = route.legs[0].start_location.lat + ',' + route.legs[0].start_location.lng;

    var akhir = route.legs[0].end_address;
    var akhirC = route.legs[0].end_location.lat + ',' + route.legs[0].end_location.lng;

    var jarak = route.legs[0].distance.text;
    var waktu = route.legs[0].duration.text
  
    var caption = "📐 Distance: <code>" + jarak + "</code>";
    caption += "\n🚙 Car: <code>" + waktu + "</code>"
    caption += "\n\n<b>🌏 Location</b>"
    caption += "\n  ├ <code>" + mulai + "</code>, <b><i>To:</i></b>"
    caption += "\n  └ <code>" + akhir + "</code>"

    var photo = map.getBlob();

    var keyboard = [
      [tg.button.text('❌ Close', 'me_del')]
    ]

    var reply_markup = {
        inline_keyboard: keyboard
    }

    var data = {
        chat_id: String(msg.chat.id),
        photo: photo,
        caption: caption,
        parse_mode: 'HTML',
        reply_markup: JSON.stringify(reply_markup)
    };

    var hasil = tg.sendMsg(msg, "⏳ Searching...", 'html', true)
    var newMsg = hasil.result;

    tg.requestForm('sendPhoto', data);
    return tg.deleteMessage(msg.chat.id, newMsg.message_id)
  }

// If rute are empty will be send this.

  if (/^\/rute$/i.exec(msg.text)) {
    var pesan = "⚠️ Location required!"
    pesan += "\n\nUse the following format:"
    pesan += "\n/rute [starting location] to [final location]"
    pesan += "\nEX: <code>/rute menlo park to mountain view</code>"
    pesan += "\n\nImportant to note!\nTo find a route you have to use <b>to</b> as a final pointer, <u>otherwise it will cause an error.</u>"

    return tg.sendMsg(msg, pesan, 'html', true)
  }
