import axios from 'axios';


export const parseMessage = (messages, today) => {
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
      message_id: message.id,
      color: message.color
    };
  });
};

export const queryMessageDetails = (messageId, messageIndex, setCurrentMessage) => {
  const readMessage = [
    () => { return axios.get(`/api/messages/read/${messageId}`); },
    () => { return axios.put(`/api/messages/${messageId}/read/null`); }
  ];

  axios.all(readMessage.map(axiosCall => axiosCall()))
  .then(axios.spread((res1, res2) => {
    setCurrentMessage(res1.data, messageIndex);
  }))
  .catch(err => {
    console.log('ERROR getting messages: ', err);
  });

}; 