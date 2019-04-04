
module.exports = (connection) => {
    //here to be connected to database

    return (req, res) => {
        let employer_ID = req.params.poster_id;
        let query = 'INSERT INTO Follow(follower_ID, followed_ID) VALUE('
                    +req.session.user.user_ID + ',' + employer_ID + ');'
        console.log(req.params.poster_id)
        console.log(req.session.user.user_ID)
        connection.query(
            query,
            (error, results, fields) => {
                if(error){
                    console.log(error)
                    res.redirect('/')
                } else {
                    console.log('Followed')
                    res.redirect('/')
                }
            }
        );

        // console.log("this is get");
        // console.log(req.params.job_id);
        // res.render('pages/job_des', {info : info});
    };

}
