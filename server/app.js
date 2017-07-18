'use strict';
const express = require('express');
const path = require('path');
const middleware = require('./middleware');
const routes = require('./routes');
const axios = require('axios');
const app = express();


app.use(middleware.morgan('dev'));
app.use(middleware.cookieParser());
app.use(middleware.bodyParser.urlencoded({extended: false}));
app.use(middleware.bodyParser.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, '../public')));



app.use('/', routes.auth);
console.log('after app.use /');

app.use('/authenticated', routes.auth);
console.log('after app use /auth ');

app.use('/api', routes.api);

app.use('/api/message', routes.messages);

app.use('/api/messages', routes.messages);
console.log('after app use /api/messages');

app.use('/api/profiles', routes.profiles);


app.use('/api/messages', routes.messages);

app.use('/api/folders', routes.folders);
  // console.log('getting messages');
  //cget data from database from here
  // axios.get('https://api.nylas.com/messages', 
  //   { authentication: {'X-Custom-Header': 'foobar'} 
  //   })
  // .then(response => {
  //   res.send('hello');
  // });
  // axios.get('/')
  

    // res.send(result)

module.exports = app;
