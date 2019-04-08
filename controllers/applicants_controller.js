
module.exports = (connection) => {
    //here to be connected to database

    return (req, res) => {
        let job_ID = req.params.id;
        let query = "SELECT * "
        + "FROM Applied JOIN User ON User.user_ID = Applied.applicant_ID "
        + "WHERE applied_jobID = "+job_ID+";";
        connection.query(
            query,
            (error, results, fields) => {
                if(error){
                    console.log(error)
                    res.json(error)
                } else {
                    // console.log(results)
                    res.render('pages/applicant', {jobs:results});
                }
            }
        );
    };

}