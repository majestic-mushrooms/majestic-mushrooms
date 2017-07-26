import axios from 'axios';


export const parseMessage = (messages, today) => {
  return messages.map((message) => {
    //message.date if youre using nylas calls
    const date = new Date(message.date_received || message.date * 1000);
    let day = date.getMonth() + '/' + date.getDate() + '/' + ('' + date.getFullYear()).substr(-2);
    day = day === today ? 'Today' : day;
    const time = date.getHours() + ':' + ('0' + date.getMinutes()).substr(-2);
    return {
      from: typeof message.from === 'string' ? JSON.parse(message.from) : message.from,
      subject: message.subject,
      snippet: message.snippet,
      unread: message.unread,
      timestamp: day + ' ' + time,
      message_id: message.message_id,
      color: message.color
    };
  });
};

export const queryMessageDetails = (messageId, messageIndex, messageUnread, setCurrentMessage) => {
  const readMessage = [
    () => { return axios.get(`/api/messages/read/${messageId}`); },
    () => {  if (messageUnread === true) { return axios.put(`/api/messages/${messageId}/read/null`); } }
  ];

  axios.all(readMessage.map(axiosCall => axiosCall()))
  .then(axios.spread((res1, res2) => {
    setCurrentMessage(res1.data, messageIndex);
  }))
  .catch(err => {
    console.log('ERROR getting messages: ', err);
  });

}; 




export const createMessage = (formData, fromEmail) => {
  if (formData !== null) {
    
    let email = {
      body: formData.emailContentInputField.value,
      from: [
        {name: fromEmail, email: fromEmail}
      ],
      subject: formData.subjectInputField.value,
      to: [
        {name: formData.toInputField.value, email: formData.toInputField.value}
      ]
    };
  
    const ccField = formData.ccInputField;
    if (ccField && ccField.value !== '') {
      email.cc = [
        {name: ccField.value, email: ccField.value}
      ];
    }

    return email;
  }
};


// cc: [ 
//   {name: formData.ccInputField.value, email: formData.ccInputField.value}
// ],


