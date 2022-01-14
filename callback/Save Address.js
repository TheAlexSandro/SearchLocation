if (/svAddres$/i.exec(cb.data)) {
    var gtpsn = user.getValue('esan_' + chatID)
    var gtlink = user.getValue('link_' + chatID)
    var gtddg = user.getValue('ddg_' + chatID)
    var gtwaze = user.getValue('waze_' + chatID)
    var gthere = user.getValue('here_' + chatID)

    user.setValue('pesanWelcome_' + chatID, gtpsn)

    var pesan = "" + gtpsn
    var keyb = []

    keyb[0] = [
      tg.button.text('🌎 Open With...', 'open_with')
    ]
    keyb[1] = [
      tg.button.url('🚦 View Traffic Conditions', '' + gttraf)
    ]
    keyb[2] = [
      tg.button.text('📁 Save As Address', 'failAddress')
    ]
    var keybMsg = { inline_keyboard: keyb }

    tg.answerCallbackQuery(cb.id, "This address has been saved ✅\n\nTo check it, send /myaddress", true)
    return tg.editMessageText(chatID, msg.message_id, msg.inline_message_id, pesan, 'html', true, keybMsg)
  }

  if (/failAddress$/i.exec(cb.data)) {
    return tg.answerCallbackQuery(cb.id, "You have saved this address 🤷‍♂️\n\nTo check it, send /myaddress", true)
  }

  if (/delConfirm$/i.exec(cb.data)) {
    var pesan = "⚠️ <b>Warning</b>"
    pesan += "\n\nAre you sure you want to delete this address? once deleted you need to set the address again."
    var keyb = []

    keyb[0] = [
      tg.button.text('❌ Cancel', 'home'),
      tg.button.text('✅ Sure', 'delAddress')
    ]
    var keybMsg = { inline_keyboard: keyb }

    tg.editMessageText(chatID, msg.message_id, msg.inline_message_id, pesan, 'html', true, keybMsg)
    tg.answerCallbackQuery(cb.id, "")
    return;
  }
