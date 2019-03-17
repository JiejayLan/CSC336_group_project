
module.exports = (connection) => {
    const uuid = require('uuid/v1');
    return (req, res) => {
          
        console.log(String.format("%040d", new BigInteger(UUID.randomUUID().toString().replace("-", ""), 16)));
        let query;
        const JOB_ID = 656;
        // const POSTER_ID = req.session.user.user_ID;
        const POSTER_ID = 104;
        const JOB_DESCRIPTION = req.body.description;
        const JOB_LOCATION = req.body.location;
        const JOB_TITLE = req.body.title;
        const PARAMATER = [JOB_ID,POSTER_ID ,JOB_TITLE ,JOB_DESCRIPTION,JOB_LOCATION];
        query = 
        'INSERT INTO Jobs(job_ID,poster_ID,job_title,description,location)'+
        'VALUES ('+
        JOB_ID +',' + '"'+POSTER_ID+'", "' + JOB_TITLE+ '","' + JOB_DESCRIPTION +'","' 
        + JOB_LOCATION+'");'

        console.log(query);
        connection.query( 
            query,
            // PARAMATER,
            (error, results, fields) => {
                if (error) {
                    res.json(error)
                } else {
                    res.redirect('/');
                }
            }
        
        );
        // res.redirect('/');
  
       
    }  
}


// INSERT INTO Jobs(job_ID,poster_ID,job_title,description,location)
// VALUES
//     (
//         1000,
//         103,
//         'front-end programmer',
//         'one of the best job',
//         'New York'

//     ),
//     (
//         1001,
//         104,
//         'MTA bus operator',
//         'A lot of money',
//         'Bronx'
//     );


// query= ' SELECT job_ID, job_title, location FROM Jobs WHERE' 
// +' job_title LIKE' 
// + '"%' + user_title 
// + '%"'
// +'AND '
// +'location ='
// +'"'+user_location+ '"'
// ' ;';   