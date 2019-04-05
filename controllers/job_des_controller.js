
module.exports = (connection) => {
    //here to be connected to database
    return (req, res) => {
        let poster_ID;
        let followed_list ;
        let status = 'unfollowed';
        //let query;
        // let query = 'SELECT * FROM Jobs WHERE job_ID='
        //             + req.params.job_id;
        // let query = 'SELECT * FROM Jobs NATURAL JOIN Employer WHERE job_ID='
        //             + req.params.job_id;
        let query = 'SELECT * FROM Jobs JOIN Employer ON poster_ID = employer_ID WHERE job_ID='
                    + req.params.job_id;
        // let query2 = 'SELECT followed_ID FROM Follow WHERE follower_ID='
        //              + poster_ID;
        connection.query(
            query,
            (error, results, fields) => {
                if(error){
                    console.log(error)
                    res.json(error)
                } else{
                    console.log("result is ", results)
                    // const description = results.description;
                    // const job_title = results.job_title;
                    // const poster_id = results.poster_ID;
                    // const location = results.location;
                    poster_ID = results[0].poster_ID
                    let query2 = 'SELECT followed_ID FROM Follow WHERE follower_ID='
                     + req.session.user.user_ID;
                     //console.log('poster_ID is: ', poster_ID)
                     if(req.session.user.user_ID != undefined){
                        connection.query(
                            query2,
                            (error, result, fields) => {
                                if(error){
                                    console.log(error)
                                } else {
                                    followed_list = result
                                    //console.log("this is posterid:", poster_ID)
                                    console.log("this is ", followed_list)
                                    followed_list.forEach(function(followed){
                                        if(followed.followed_ID == poster_ID){
                                            status = 'followed'
                                            // break;
                                        }
                                    })
                                    res.render('pages/job_des',{info: results[0], user_type: req.session.user.type_name, status: status })
                                }
                            }
                        );
                     }
                     else{
                        res.render('pages/job_des',{info: results[0], user_type: req.session.user.type_name })
                     }
                }
            }
        );

        // console.log("this is get");
        // console.log(req.params.job_id);
        // res.render('pages/job_des', {info : info});
    };

}
