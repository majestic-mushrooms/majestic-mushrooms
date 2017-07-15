'use strict';
const express = require('express');
const path = require('path');
const middleware = require('./middleware');
const routes = require('./routes');

const app = express();

console.log('about to call middlewares');
app.use(middleware.morgan('dev'));
app.use(middleware.cookieParser());
app.use(middleware.bodyParser.urlencoded({extended: false}));
app.use(middleware.bodyParser.json());
console.log('called middlewares');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

console.log('set view engine');
app.use(middleware.auth.session);
console.log('app using middleware.auth.session');

app.use(middleware.passport.initialize());
console.log('app using middleware.passport initialize');

app.use(middleware.passport.session());
console.log('app using midleware passport session');

// app.use(middleware.flash());


app.use(express.static(path.join(__dirname, '../public')));
console.log('After app.use express.static');

app.use('/', routes.auth);
console.log('after app use / ');
app.use('/api', routes.api);
console.log('after app use /api ');

app.use('/api/profiles', routes.profiles);
console.log('after app use /api/profiles');


module.exports = app;
