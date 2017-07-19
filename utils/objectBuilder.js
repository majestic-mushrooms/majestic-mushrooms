

//@TODO remove hardcoded values
let creatMessage = (formData) => {
  if (formData !== null) {
    let body = formData.emailContentInputField.value;
    let snippetLength = (body.length > 500) ? 500 : body.length;
    
  
    return {
      account_id: formData.accountId,
      body: body,
      cc: JSON.stringify([formData.ccInputField.value]),
      date_received: new Date(Date.now()),
      from: JSON.stringify(formData.fromField),
      labels: JSON.stringify(formData.labels),
      message_id: Date.now(),
      snippet: body.substring(0, snippetLength),
      starred: false,
      subject: formData.subjectInputField.value,
      thread_id: formData.threadId,
      to: JSON.stringify([formData.toInputField.value]),
      unread: true,
    };
  }


};

module.exports = {
  createMessage: creatMessage
};

