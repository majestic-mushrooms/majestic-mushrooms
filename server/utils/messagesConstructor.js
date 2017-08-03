const sanitizeHtml = require('sanitize-html');
const allowedTags = ['<a>','<abbr>','<acronym>','<address>','<area>','<b>','<bdo>','<big>','<blockquote>','<br>','<button>','<caption>','<center>','<cite>','<code>','<col>','<colgroup>','<dd>','<del>','<dfn>','<dir>','<div>','<dl>','<dt>','<em>','<fieldset>','<form>','<h1>','<h2>','<h3>','<h4>','<h5>','<h6>','<hr>','<i>','<img>','<input>','<ins>','<kbd>','<legend>','<li>','<map>','<menu>','<ol>','<optgroup>','<option>','<p>','<pre>','<q>','<s>','<samp>','<select>','<small>','<span>','<strike>','<strong>','<sub>','<sup>','<table>','<tbody>','<td>','<textarea>','<tfoot>','<th>','<thead>','<u>','<tr>','<tt>','<u>','<ul>','<var>']

const colors = {
  A: '#D81B60',
  B: '#E91E63',
  C: '#9C27B0',
  D: '#D32F2F',
  E: '#EF6C00',
  F: '#6A1B9A',
  G: '#7B1FA2',
  H: '#EF5350',
  I: '#F57C00',
  J: '#C2185B',
  K: '#880E4F',
  L: '#C62828',
  M: '#3F51B5',
  N: '#E53935',
  O: '#8E24AA',
  P: '#AB47BC',
  Q: '#EC407A',
  R: '#F06292',
  S: '#AD1457',
  T: '#F44336',
  U: '#FB8C00',
  V: '#4A148C',
  W: '#E65100',
  X: '#FF9800',
  Y: '#EF6C00',
  Z: '#FFA726',
}; 

const createMessages = (messages) => {
  return messages.map(email => {
    const firstLetter = email.from[0].name[0];
    const stringFrom = firstLetter !== undefined && firstLetter.toUpperCase !== undefined ? 
      firstLetter.toUpperCase() : '';
    const color = colors[stringFrom] !== undefined ? colors[stringFrom] : '#FFC107';

    return {
      message_id: email.id,
      account_id: email.account_id,
      thread_id: email.thread_id,
      subject: email.subject,
      color: color,
      from: JSON.stringify(email.from),
      to: JSON.stringify(email.to),
      cc: JSON.stringify(email.cc),
      bcc: JSON.stringify(email.bcc),
      reply_to: JSON.stringify(email.reply_to),
      date_received: new Date(email.date * 1000),
      unread: email.unread,
      starred: email.starred,
      snippet: email.snippet,
      body: sanitizeHtml(email.body, { 
        allowedTags: false,
        allowedAttributes: false,
        allowedClasses: false
      }),
      files: JSON.stringify(email.files),
      events: JSON.stringify(email.events),
      folders: JSON.stringify(email.folder),
      labels: JSON.stringify(email.labels),
    };
  });
};
const createSortedMessages = (messages) => {
  var sortedMessages = [];
  messages.map(email => {
    for (var i = 0; i < email.labels.length; i++) {
      sortedMessages.push({
        message_id: email.id,
        folder_id: email.labels[i].id,
      });
    }
  });
  return sortedMessages;
};

const createDatabaseMessageObject = (message) => {
  return {
    message_id:       message.id,
    account_id:       message.account_id,
    thread_id:        message.thread_id,
    subject:          message.subject,
    color:            colors[Math.floor(Math.random() * 12)],
    from:             JSON.stringify(message.from),
    to:               JSON.stringify(message.to),
    cc:               JSON.stringify(message.cc),
    reply_to:         JSON.stringify(message.reply_to),
    date_received:    new Date(message.date),
    unread:           message.unread,
    starred:          message.starred,
    snippet:          message.snippet,
    body:             message.body,
    labels:           JSON.stringify(message.labels)
  };
};

module.exports = {
  createMessages:               createMessages,
  createDatabaseMessageObject:  createDatabaseMessageObject,
  createSortedMessages:         createSortedMessages
};
