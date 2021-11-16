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
