// callback detection
  if (update.callback_query) {   
    return prosesCallback(update.callback_query)
  }

// function for callback
function prosesCallback(cb) {
  var msg = cb.message;
  var user = new telegram.user()
}

if (/me_del$/i.exec(cb.data)) {
    return tg.deleteMessage(chatID, msg.message_id)
  }

if (/svAddres$/i.exec(cb.data)){
    var setAdd = user.getValue('esan_'+msg.chat.id)
    user.setValue('pesanWelcome_'+msg.chat.id, setAdd)
    var pesan = "This address have been save ✅"
    pesan += "\nTo check it. Send /myaddress"
    tg.answerCallbackQuery(cb.id, pesan, true)
   return;
  }

if (/edit_address/i.exec(cb.data)){
    var pesan = "To edit your address, use:"
    pesan += "\n/setaddress again"
    pesan += "\nEX: /setaddress your address"
    var keyb = []

    keyb[0] = [
      tg.button.text('⬅️ Back', 'home')
    ]
    var keybMsg = { inline_keyboard: keyb }

    tg.editMessageText(chatID, msg.message_id, msg.inline_message_id, pesan, 'html', true, keybMsg)
    return tg.request('answerCallbackQuery', { callback_query_id: cb.id, text: '' });
  }

if (/home$/i.exec(cb.data)){
  var pesanWelcome = user.getValue('pesanWelcome_'+msg.chat.id);

  var psn = "Your address is: <code>"+pesanWelcome+"</code>"
  psn += "\n\n<b>To get location use:</b>"
  psn += "\n<code>/loc "+pesanWelcome+"</code>"
  var keyb = []

  keyb[0] = [
    tg.button.text('✏️ Edit Address', 'edit_address'),
    tg.button.text('❌ Close', 'me_del')
  ]
  var keybMsg = { inline_keyboard: keyb }

   tg.editMessageText(chatID, msg.message_id, msg.inline_message_id, psn, 'html', true, keybMsg)
   return tg.request('answerCallbackQuery', { callback_query_id: cb.id, text: '' });
  }
