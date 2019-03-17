
module.exports = (connection) => {
    const uuid = require('uuid/v1');
    return (req, res) => {
          
        // console.log("post job",req.body.title,req.body.location,req.body.description);
        console.log(uuid());
        // res.json({'status':'post successfully'});
        let query;
        const JOB_ID = uuid();
        const POSTER_ID = req.session.user.user_ID;
        const JOB_DESCRIPTION = req.body.description;
        const JOB_LOCATION = req.body.location;
        const JOB_TITLE = req.body.title;
        //incomplete
        // connection.query( 
        //     query,
        //     (error, results, fields) => {
        //         if (error) {
        //             res.json(error)
        //         } else {
        //             res.redirect('/');
        //         }
        //     }
        
        // );
        res.redirect('/');
  
       
    }  
}


    // let job_title = req.body.title;
    // let job_location = req.body.location;
    // let job_description= req.body.description;