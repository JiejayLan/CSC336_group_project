;

const bodyParser = require('body-parser');


module.exports = (connection) => {
  console.log('chekc authenticate');
  return [
    
    bodyParser.json(),
    
    (req, res) => {
      
      const USERNAME = req.body.username;
      const PASSWORD = req.body.password;
      const QUERY = ' SELECT ' +
                    '   *' +
                    ' FROM ' + 
                    '   User' +
                    ' WHERE' +
                    '   username=' + '"' + USERNAME + '"' +
                    '   AND' +
                    '   password=' + '"' + PASSWORD + '"'
                    ' ;';
      
      connection.query(
        QUERY,
        
        (error, results, fields) => {
          if (error) {
            
            console.log(error); //  Error querying
            res.status(400);
            res.json(error);
            
          } else {

            if (results.length === 0) {
              console.log('not found');
              res.status(204);  //  Not found
              res.json(results);
              
            } else {
              
              res.status(200)   //  Okay
              res.json(results)
              
            }
            
          }
        })
    }
  ]
}