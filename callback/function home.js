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
