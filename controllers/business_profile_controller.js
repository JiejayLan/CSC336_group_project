;

module.exports = (connection) => {
  return (req, res) => {
    let page_id = req.params.id;
    let user_id = req.session.user.user_ID;
    let query = "SELECT * "
    + "FROM User NATURAL JOIN Employer "
    + "WHERE employer_ID = "+page_id+" AND user_ID = "+page_id+";";

    let query1 = "SELECT * "
    + "FROM Jobs "
    + "WHERE poster_ID = "+page_id+";";
    
    connection.query( 
      query,
      (error, results, fields) => {
          if (error) {
              console.log(error)
              res.json(error)
          } else {
            // console.log('result is ',results);
            let user = results;
            connection.query(
              query1,
              (error, results, fields) => {
                if (error) {
                  console.log(error)
                  res.json(error)
                } else {
                  res.render('pages/business_profile', {business:user[0], id:page_id, user_id:user_id, jobs: results});
                }
              }
            )
            
          }
      }
  
  );
}
}