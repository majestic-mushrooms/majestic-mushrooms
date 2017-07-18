'use strict';
const app = require('./app');
const db = require('../db');
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0'; //allow outside access

app.listen(PORT, '0.0.0.0', '', () => {
  console.log(`Example app listening on port ${PORT}!`);
});
