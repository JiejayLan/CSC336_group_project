;

const express = require('express');
const router = express.Router();

module.exports = (connection) => {
  
  router.get('/users/:user_ID', require('./get_user.js')(connection));
  router.post('/authenticate', require('./authenticate_user.js')(connection));
  
  return router;
  
}