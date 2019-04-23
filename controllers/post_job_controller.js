module.exports = (connection) => {
    const uuid = require('uuid/v1');
    return (req, res) => {      
        let query;
        const JOB_ID = Math.floor(Math.random() * 1000000000);
        const POSTER_ID = req.session.user.user_ID;
        const JOB_DESCRIPTION = req.body.description;
        const JOB_LOCATION = req.body.location;
        const JOB_TITLE = req.body.title;
        query = 'CALL PostJob(?,?,?,?,?);';

        connection.query( 
            query,
            [JOB_ID,POSTER_ID,JOB_TITLE,JOB_DESCRIPTION,JOB_LOCATION],
            (error, results, fields) => {
                if (error) {
                    res.json(error)
                } else {
                    res.redirect('/');
                }
            }
        
        );
       
    }  
}

