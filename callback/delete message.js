if (/me_del$/i.exec(cb.data)) {
    return tg.deleteMessage(chatID, msg.message_id)
  }
