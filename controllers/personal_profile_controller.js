;

module.exports = (connection) => {
  return (req, res) => {
    let page_id = req.params.id;
    let user_id = req.session.user.user_ID;
    // let query = "SELECT * "
    //   + "FROM User NATURAL JOIN Employee "
    //   + "WHERE employee_ID = " + page_id + " AND user_ID = " + page_id + ";";
    let query = 'CALL GetEmployee(?);';

    // let query1 = "SELECT * "
    //   + "FROM Follow JOIN User ON followed_ID = user_ID "
    //   + "WHERE follower_ID = " + page_id + ";"
    let query1 = 'CALL GetFollow(?);';

    // let query2 = "SELECT * "
    //   + "FROM Speak NATURAL JOIN Language "
    //   + "WHERE person_ID = " + page_id + ";"
    let query2 = 'CALL GetSpeak(?);'

    // let query3 = "SELECT * "
    // + "FROM Applied JOIN Jobs ON applied_jobID = job_ID "
    // + "WHERE applicant_ID = " + page_id + ";"
    let query3 = 'CALL GetApplied(?);'

    connection.query(
      query,
      [page_id],
      (error, results, fields) => {
        if (error) {
          console.log(error)
          res.json(error)
        } else {
          let user = results;
          connection.query(
            query1,
            [page_id],
            (error, results, fields) => {
              if (error) {
                console.log(error)
                res.json(error)
              } else {
                let follow = results;
                connection.query(
                  query2,
                  [page_id],
                  (error, results, fields) => {
                    if (error) {
                      console.log(error)
                      res.json(error)
                    } else {
                      let language = results;
                      connection.query(
                        query3,
                        [page_id],
                        (error, results, fields) => {
                          if (error) {
                            console.log(error)
                            res.json(error)
                          } else {
                            let applied = results;
                            res.render('pages/personal_profile', { user: user[0], id: page_id, follow: follow, user_id: user_id, language: language, applied:applied });
                          }
                        }
                      )
                    }
                  }
                )
              }
            });
        }
      });
  }
}