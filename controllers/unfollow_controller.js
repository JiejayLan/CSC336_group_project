
module.exports = (connection) => {
    //here to be connected to database

    return (req, res) => {
        let employer_ID = req.params.poster_id;
        let employee_ID = req.session.user.user_ID;
        let query = 'DELETE FROM Follow WHERE followed_ID='
                    + employer_ID + ' AND follower_ID = ' 
                    + employee_ID + ';'
        console.log(req.params.poster_id)
        console.log(req.session.user.user_ID)
        connection.query(
            query,
            (error, results, fields) => {
                if(error){
                    console.log(error)
                    res.redirect('/')
                } else {
                    console.log('UnFollowed')
                    res.redirect('/')
                }
            }
        );

        // console.log("this is get");
        // console.log(req.params.job_id);
        // res.render('pages/job_des', {info : info});
    };

}
