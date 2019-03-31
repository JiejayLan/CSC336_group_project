
module.exports = (connection) => {
    //here to be connected to database

    return (req, res) => {
        //let query;
        // let query = 'SELECT * FROM Jobs WHERE job_ID='
        //             + req.params.job_id;
        let query = 'SELECT * FROM Jobs NATURAL JOIN Employer WHERE job_ID='
                    + req.params.job_id;
        // let query2 = 'SELECT business FROM Employer WHERE employer_ID='
        //             + results.poster_ID;
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
                    // let info = [job_title, description, location, poster_id];
                    res.render('pages/job_des',{info: results[0]})
                }
            }
        );

        // console.log("this is get");
        // console.log(req.params.job_id);
        // res.render('pages/job_des', {info : info});
    };

}
