//Format messages for list view
module.exports = function(messages, today) {
  return messages.slice(0, 21).map((message) => {
    const date = new Date(message.date * 1000);
    let day = date.getMonth() + '/' + date.getDate() + '/' + ('' + date.getFullYear()).substr(-2);
    day = day === today ? 'Today' : day;
    const time = date.getHours() + ':' + ('0' + date.getMinutes()).substr(-2);

    return {
      from: message.from,
      subject: message.subject,
      snippet: message.snippet,
      unread: message.unread,
      timestamp: day + ' ' + time,
      message_id: message.id
    };
  });
};