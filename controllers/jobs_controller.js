;
module.exports = (connection) => {
  return (req, res) => {
    let query;
    let location =req.query.InputLocation; 
    let user_id = req.session.user.user_ID;
    let user_type = req.session.user.type_name;
    let title =req.query.InputTitle;

    if(location === "" || location === undefined)
        location = null;
    if(title === "" || title === undefined)
        title = null;    
    // console.log(location , title);

    query = 'CALL SearchJob(?,?);';

    connection.query( 
        query,
        [location,title],
        (error, results, fields) => {
            if (error) {
                console.log(error)
                res.json(error)
            } else {
              console.log('result is ',results[0]);
              res.render('pages/index',{results:results[0],user_type:user_type, user_id:user_id})
            }
        }
    
    );
}
}