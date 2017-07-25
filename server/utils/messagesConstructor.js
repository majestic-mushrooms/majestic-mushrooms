module.exports = function(messages) {
  const colors = [
    'red', 'orange', 'yellow', 'olive', 'green', 'teal',
    'blue', 'violet', 'purple', 'pink', 'brown', 'grey', 'black'
  ]; 

  return messages.map(email => {
    return {
      message_id: email.id,
      account_id: email.account_id,
      thread_id: email.thread_id,
      subject: email.subject,
      color: colors[Math.floor(Math.random() * 12)],
      from: JSON.stringify(email.from),
      to: JSON.stringify(email.to),
      cc: JSON.stringify(email.cc),
      bcc: JSON.stringify(email.bcc),
      reply_to: JSON.stringify(email.reply_to),
      date_received: new Date(email.date * 1000),
      unread: email.unread,
      starred: email.starred,
      snippet: email.snippet,
      body: email.body,
      files: JSON.stringify(email.files),
      events: JSON.stringify(email.events),
      folders: JSON.stringify(email.folder),
      labels: JSON.stringify(email.labels),
    }
  })
};