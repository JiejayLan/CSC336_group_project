;

module.exports = (connection) => {
  return (req, res) => {
    let user_id = req.params.id;
    let query = "SELECT * "
    + "FROM User NATURAL JOIN Employer NATURAL JOIN Jobs "
    + "WHERE employer_ID = "+user_id+" AND poster_ID = "+user_id+" AND user_ID = "+user_id+";";
    
    connection.query( 
      query,
      (error, results, fields) => {
          if (error) {
              console.log(error)
              res.json(error)
          } else {
            // console.log('result is ',results);
          res.render('pages/business_profile', {results:results, business:results[0], id:user_id});
          }
      }
  
  );
}
}