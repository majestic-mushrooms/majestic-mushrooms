'use strict';
const express = require('express');
const path = require('path');
const middleware = require('./middleware');
const routes = require('./routes');

const app = express();

app.use(middleware.morgan('dev'));
app.use(middleware.cookieParser());
app.use(middleware.bodyParser.urlencoded({extended: false}));
app.use(middleware.bodyParser.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(middleware.auth.session);


app.use(express.static(path.join(__dirname, '../public')));
console.log('After app.use express.static');

app.use('/', routes.auth);
console.log('after app use / ');

app.use('/api', routes.api);
console.log('after app use /api ');

app.use('/api/message', routes.messages);
console.log('after app use /api/message');

app.use('/api/profiles', routes.profiles);
console.log('after app use /api/profiles');


module.exports = app;
