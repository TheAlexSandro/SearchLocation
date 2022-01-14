if (/me_del$/i.exec(cb.data)) {
    return tg.deleteMessage(msg.chat.id, msg.message_id)
  }
