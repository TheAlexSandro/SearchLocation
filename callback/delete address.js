if (/delAddress$/i.exec(cb.data)) {
    var address = user.getValue('pesanWelcome_'+chatID)
    user.delete('pesanWelcome_'+chatID)

    var pesan = "Address: " + address + " have been deleted ✅"
    return tg.editMessageText(chatID, msg.message_id, msg.inline_message_id, pesan, 'html', true)
  }
