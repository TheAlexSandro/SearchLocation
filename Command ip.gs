if (cocok = /^([\/]ip+ )/i.exec(msg.text)) {
      {
        var ipAddr = msg.text.replace(cocok[1], '');

        var url = 'https://public-restapi.herokuapp.com/api/ip-geolocation?ipaddress=' + ipAddr
        var resp = UrlFetchApp.fetch(url);
        resp = JSON.parse(resp);

        if (resp.status == 'fail') return tg.sendMsg(msg, "⚠️ Domain or IP address not found!\n\nThings that can cause errors:\n• Use http or https\n• Wrong type of domain", 'html')

        var stat = resp.status
        var country = resp.country
        var cCode = resp.countryCode
        var reg = resp.region
        var regN = resp.regionName
        var city = resp.city
        var zip = resp.zip
        var lat = resp.lat
        var lon = resp.lon
        var tiZ = resp.timezone
        var isp = resp.isp
        var org = resp.org
        var as = resp.as
        var que = resp.query

        var psn = "├──「🌐: " + ipAddr
        psn += "\n│"
        psn += "\n├• <b>🖥 IP:</b> <code>" + que + "</code>"
        psn += "\n├• <b>🎛 AS:</b> <code>" + as + "</code>"
        psn += "\n├• <b>🕗 Timezone:</b> <code>" + tiZ + "</code>"
        psn += "\n└• <b>🌍 Country:</b> <code>" + country + "</code>"
        psn += "\n        ├ Region: <code>" + regN + "</code>"
        psn += "\n        ├ City: <code>" + city + "</code>"
        psn += "\n        └ Zip: <code>" + zip + "</code>"
        psn += "\n\n├──「📡 ISP"
        psn += "\n│"
        psn += "\n└• <b>" + isp + "</b>"
        psn += "\n\n├──「📍Geometry"
        psn += "\n│"
        psn += "\n├• Lat: <code>" + lat + "</code>"
        psn += "\n└• Long: <code>" + lon + "</code>"
        psn += "\n\nGet maps:"
        psn += "\n<code>/loc " + lat + ", " + lon + "</code>"
        var keyb = []

        keyb[0] = [
          tg.button.text('⏹ View in Popup', 'aii_popup')
        ]

        var aii = "🌐: " + ipAddr
        aii += "\n"
        aii += "\n• 🖥 IP: " + que
        aii += "\n• 🕗 Timezone: " + tiZ
        aii += "\n• 🌍 Country: " + country
        aii += "\n•  Region: " + regN
        aii += "\n•  City: " + city
        aii += "\n•  Zip: " + zip
        aii += "\n\n📡 ISP"
        aii += "\n• " + isp

        user.setValue('aii_' + msg.chat.id, aii)

        tg.sendMsgKeyboardInline(msg, psn, keyb, 'html', true);
        return;
      }
    }

    // If domain/ip address is empty will be send this.
    var pola = /^\/ip$/i
    if (pola.exec(msg.text)) {
      var pesan = "⚠️ Domain address required!"
      pesan += "\nEX: /ip google.com"
      pesan += "\nOr you can use IP address"
      pesan += "\n\n❌ Don't use http/https it causes error: <s>https://google.com</s>"

      return tg.sendMsg(msg, pesan, 'html', true)
    }
