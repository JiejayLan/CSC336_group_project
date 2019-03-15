;

const express = require('express');
const router = express.Router();

module.exports = (connection) => {
  
  router.get('/users/:emplid', require('./get_user.js')(connection));
  
  return router;
  
}