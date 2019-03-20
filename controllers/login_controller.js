

;

const request = require('request');
const express = require('express');
const bodyParser = require('body-parser');


module.exports = (connection) => {
  
  const router = express.Router();

  router
    
    .get(
      '/login', 
      (req, res) => {
        
        const USER_IS_LOGGED_IN = req.session.user.user_ID !== undefined;
        
        if (USER_IS_LOGGED_IN) {
          
          res.redirect('/')
          
        } else {
          
          res.render('pages/login')
          
        }
      }
    )
      
    .post(
      '/login', 
      
      bodyParser(),
      
      (req, res) => {
        
        //  Define variables
        const REQUEST_ENDPOINT_LOCAL =  'http://' + 
                                        req.hostname + ':' +  
                                        process.env.PORT +
                                        '/api/authenticate';
                                        
        const REQUEST_ENDPOINT_REMOTE = req.protocol + '://' +
                                        req.hostname +
                                        '/api/authenticate';
                                        
                                        
        const REQUEST_ENDPOINT =  req.hostname === 'localhost' ? 
                                  REQUEST_ENDPOINT_LOCAL :
                                  REQUEST_ENDPOINT_REMOTE;
        const REQUEST_METHOD = 'POST';
        const USERNAME = req.body.username;
        const PASSWORD = req.body.password;
        
        
        //  Make a request to '/api/authenticate'
        //  to verify user credentials
        request(
          
          {
            url: REQUEST_ENDPOINT,
            method: REQUEST_METHOD,
            json: true,
            body: {
              username: USERNAME,
              password: PASSWORD
            }
            
          },
          
          (error, response, body) => {
            
            if (error) {
              console.log('error');
              res.status(400);
              res.json(error);
              
            } else {
              console.log('no error');
              const RESPONSE_STATUS_CODE = response.statusCode;
              console.log(RESPONSE_STATUS_CODE)
              switch (RESPONSE_STATUS_CODE) {
                case 200: {
                  
                  const USER_INFO = body[0]
                  
                  Object.assign(req.session.user, USER_INFO)
                  delete req.session.user['username']
                  delete req.session.user['password']
                  
                  res.redirect('/')
                  break;
                }
                
                case 204: {
                  
                  res.redirect('/login')
                  break;
                }
                
                case 400: {
                  
                  res.redirect(400, '/login')
                  break;
                }                          
              }            
              
            }         
            
          }
        )
        
        
      }
    )
  
  
  return router;
  
}