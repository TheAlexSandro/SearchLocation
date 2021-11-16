if (cocok = /^([\/]setaddress )/i.exec(msg.text)){
  var pesanWelcome = msg.text.replace(cocok[1],'');

  try {

    tg.sendMsg(msg, '✅ <b>Done</b>\nYour address have been save.\nTo check it, send /myaddress', 'HTML', false);
    
    return user.setValue('pesanWelcome_'+msg.chat.id, pesanWelcome);

  } catch (e) {
    var pesanError = e.message;
    
    if (error = /({(?:.*)})/gmi.exec(pesanError) )
    pesanError = error[1];        

    tg.sendMsg(msg, '⛔️ ERROR: '+pesanError, false, false, msg.message_id);
  }
  return;
}
