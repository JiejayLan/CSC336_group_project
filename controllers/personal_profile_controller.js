;

module.exports = (connection) => {
  return (req, res) => {
    let user_id = req.params.id;
    let query = "SELECT * "
    + "FROM User NATURAL JOIN Employee "
    + "WHERE employee_ID = "+user_id+" AND user_ID = "+user_id+";";

    let query1 = "SELECT * "
    + "FROM Follow JOIN User ON followed_ID = user_ID "
    + "WHERE follower_ID = "+user_id+";"

  

    connection.query( 
      query,
      (error, results, fields) => {
          if (error) {
              console.log(error)
              res.json(error)
          } else {
            //console.log('result is ',results);
            let user = results;
            connection.query( 
              query1,
              (error, results, fields) => {
                  if (error) {
                      console.log(error)
                      res.json(error)
                  } else {
                      //console.log('follow is ',results);
                      let follow = results;
                      res.render('pages/personal_profile', {user:user[0], id:user_id, follow:follow});
                  }
              });
            }
          });
    }
}