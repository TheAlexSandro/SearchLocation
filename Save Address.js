var user = new telegram.user()

if (/svAddres$/i.exec(cb.data)){
    var setAdd = user.getValue('esan_'+msg.chat.id)
    user.setValue('pesanWelcome_'+msg.chat.id, setAdd)
    var pesan = "This address have been save ✅"
    pesan += "\nTo check it. Send /myaddress"
    tg.answerCallbackQuery(cb.id, pesan, true)
   return;
  }
