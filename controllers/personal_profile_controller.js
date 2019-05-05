;

module.exports = (connection) => {
  return (req, res) => {
    let page_id = req.params.id;
    let user_id = req.session.user.user_ID;

    let query = 'CALL GetEmployee(?);';
    let query1 = 'CALL GetFollow(?);';
    let query2 = 'CALL GetSpeak(?);'
    let query3 = 'CALL GetApplied(?);'

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
                let follow = results[0];
                connection.query(
                  query2,
                  [page_id],
                  (error, results, fields) => {
                    if (error) {
                      console.log(error)
                      res.json(error)
                    } else {
                      let language = results[0];
                      connection.query(
                        query3,
                        [page_id],
                        (error, results, fields) => {
                          if (error) {
                            console.log(error)
                            res.json(error)
                          } else {
                            let applied = results[0];
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