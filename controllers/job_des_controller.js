
module.exports = (connection) => {
    //here to be connected to database
    return (req, res) => {
        let poster_ID;
        let followed_list ;
        let status = 'unfollowed';
        let job_id = req.params.job_id;
        let user_ID = req.session.user.user_ID;
        //let query;
        // let query = 'SELECT * FROM Jobs WHERE job_ID='
        //             + req.params.job_id;
        // let query = 'SELECT * FROM Jobs NATURAL JOIN Employer WHERE job_ID='
        //             + req.params.job_id;
        let query = 'SELECT * FROM Jobs JOIN Employer ON poster_ID = employer_ID WHERE job_ID='
                    + req.params.job_id;
        // let query = 'CALL spGetJobDescription1(?);'
        // let query2 = 'CALL PROCEDURE spGetJobDescription2(?);'
        connection.query(
            // query,
            // [req.params.job_id],
             query,
            (error, results, fields) => {
                if(error){
                    console.log(error)
                    res.json(error)
                    console.log('job description1 error')
                } else{
                    console.log("job description result is ", results)
                    // const description = results.description;
                    // const job_title = results.job_title;
                    // const poster_id = results.poster_ID;
                    // const location = results.location;
                    poster_ID = results[0].poster_ID
                    // let query2 = 'SELECT followed_ID FROM Follow WHERE follower_ID='
                    //  + req.session.user.user_ID;
                    let query2 = 'CALL spGetJobDescription2(?);'
                     //console.log('poster_ID is: ', poster_ID)
                    if(req.session.user.user_ID != undefined){
                        connection.query(
                            query2,
                            [req.session.user.user_ID],
                            // query2,
                            (error, result, fields) => {
                                if(error){
                                    console.log(error)
                                    console.log('job description2 error')
                                } else {
                                    followed_list = result
                                    //console.log("this is posterid:", poster_ID)
                                    console.log("this is job desciption ", followed_list)
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
