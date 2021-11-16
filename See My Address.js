var pola = /^[!\/]myaddress$/i;
if (pola.exec(msg.text) ){

  var pesanWelcome = user.getValue('pesanWelcome_'+msg.chat.id);
  
  // If it doesn't exist/hasn't set the address
  if (!pesanWelcome) return tg.sendMsg(msg, "⚠️ You haven't saved the address at all.\nTo save use the following format:\n/setaddress your address", false, false, msg.message_id);
  
  var psn = "Your address is: <code>"+pesanWelcome+"</code>"
  psn += "\n\n<b>To get location use:</b>"
  psn += "\n<code>/loc "+pesanWelcome+"</code>"
  var keyb = []

  keyb[0] = [
    tg.button.text('✏️ Edit Address', 'edit_address'),
    tg.button.text('❌ Close', 'me_del')
  ]

  return tg.sendMsgKeyboardInline(msg, psn, keyb, 'html')
}
