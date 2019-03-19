;

module.exports = (connection) => {
  return (req, res) => {
    let user_id = req.params.id;
    let query = "SELECT * FROM User NATURAL JOIN Employee NATURAL JOIN Follow WHERE employee_ID = "+user_id+" AND follower_ID = "+user_id+" AND user_ID = "+user_id+";";

    
    connection.query( 
      query,
      (error, results, fields) => {
          if (error) {
              console.log(error)
              res.json(error)
          } else {
             console.log('result is ',results);
          res.render('pages/personal_profile', {results:results, id:user_id});
          }
      }
  
  );
}
}