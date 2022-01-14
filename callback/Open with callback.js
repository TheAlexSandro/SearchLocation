if (/open_with$/i.exec(cb.data)) {
    var gtpsn = user.getValue('esan_' + chatID)
    var gtlink = user.getValue('link_' + chatID)
    var gtddg = user.getValue('ddg_' + chatID)
    var gtwaze = user.getValue('waze_' + chatID)
    var gthere = user.getValue('here_' + chatID)

    var pesan = "Choose where you want to open this map."
    var keyb = []

    keyb[0] = [
      tg.button.url(' 🗺 Google Maps', '' + gtlink),
      tg.button.url('🗺 DuckDuckGo', '' + gtddg)
    ]
    keyb[1] = [
      tg.button.url('🗺 Waze', '' + gtwaze),
      tg.button.url('🗺 HERE', '' + gthere)
    ]
    keyb[2] = [
      tg.button.text('⬅️ Back', 'back_to_maps')
    ]
    var keybMsg = { inline_keyboard: keyb }

    tg.editMessageText(chatID, msg.message_id, msg.inline_message_id, pesan, 'html', true, keybMsg)
    tg.answerCallbackQuery(cb.id, "")
    return;
  }

  if (/back_to_maps$/i.exec(cb.data)) {
    var gtpsn = user.getValue('esan_' + chatID)
    var gttraf = user.getValue('traf_' + chatID)

    var pesan = "" + gtpsn
    var keyb = []

    keyb[0] = [
      tg.button.text('🌎 Open With...', 'open_with')
    ]
    keyb[1] = [
      tg.button.url('🚦 View Traffic Conditions', '' + gttraf)
    ]
    keyb[2] = [
      tg.button.text('📁 Save As Address', 'svAddres')
    ]
    var keybMsg = { inline_keyboard: keyb }

    tg.editMessageText(chatID, msg.message_id, msg.inline_message_id, pesan, 'html', true, keybMsg)
    return tg.answerCallbackQuery(cb.id, "")
  }
