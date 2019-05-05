;

module.exports = (connection) => {
  return (req, res) => {
    let page_id = req.params.id;
    let user_id = req.session.user.user_ID;
    
    let query = 'CALL GetEmployer(?);';
    let query1 = 'CALL GetJob(?)'
    
    connection.query( 
      query,
      [page_id],
      (error, results, fields) => {
          if (error) {
              console.log(error)
              res.json(error)
          } else {
            let user = results[0];
            connection.query(
              query1,
              [page_id],
              (error, results, fields) => {
                if (error) {
                  console.log(error)
                  res.json(error)
                } else {
                  res.render('pages/business_profile', {business:user[0], id:page_id, user_id:user_id, jobs: results[0]});
                }
              }
            )
            
          }
      }
  
  );
}
}