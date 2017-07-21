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
console.log('app 1');
app.use(middleware.auth.session);
app.use(middleware.auth.initializeAuthentication);
console.log('app 2');

app.use(express.static(path.join(__dirname, '../public')));

console.log('app 3');

app.use('/', routes.auth);
console.log('app 4');

app.use('/authenticated', routes.auth);
console.log('app 5');


// app.use('/api', routes.api);
app.use('/api/messages', routes.messages);
console.log('app 6');

app.use('/api/profiles', routes.profiles);
app.use('/api/folders', routes.folders);
console.log('app 7');

app.use('/api/search', routes.search);
console.log('app 8');

app.use('/api/threads', routes.threads);

console.log('app 9');



module.exports = app;
