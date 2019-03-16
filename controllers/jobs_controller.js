;

module.exports = (connection) => {
  return (req, res) => {
    let QUERY;
    let user_location =req.query.InputLocation; 
    let user_id = req.session.user.user_ID;
    let user_title =req.query.InputTitle;
    let query ='';
    let queryParam =[];

    //how to use WHERE LIKE here to find the substring
    if((user_location == null||user_location=='') ){
        QUERY = 
        ' SELECT job_ID, job_title, location FROM Jobs' ;
    }
    else{
        QUERY = 
        ' SELECT job_ID, job_title, location FROM Jobs WHERE location = ?;';  
        queryParam =[user_location];       
    }

    connection.query( 
        QUERY,
        queryParam,
        (error, results, fields) => {
            if (error) {
                console.log(error)
                res.json(error)
            } else {
                let result = [  {
                    job_ID: 1000,
                    poster_ID: 103,
                    job_title: 'front-end programmer',
                    description: 'one of the best job',
                    location: 'New York' },
                 {
                    job_ID: 1001,
                    poster_ID: 104,
                    job_title: 'MTA bus operator',
                    description: 'A lot of money',
                    location: 'Bronx' },
                    {
                        job_ID: 1000,
                        poster_ID: 103,
                        job_title: 'front-end programmer',
                        description: 'one of the best job',
                        location: 'New York' },
                     {
                    job_ID: 1001,
                    poster_ID: 104,
                    job_title: 'MTA bus operator',
                    description: 'A lot of money',
                    location: 'Bronx' },
                    {
                    job_ID: 1000,
                    poster_ID: 103,
                    job_title: 'front-end programmer',
                    description: 'one of the best job',
                    location: 'New York' },
                    {
                    job_ID: 1001,
                    poster_ID: 104,
                    job_title: 'MTA bus operator',
                    description: 'A lot of money',
                    location: 'Bronx' }                                    
                ]
              if(user_title !='' && user_title !=null){
                results = results.filter((job)=>{
                    return job.job_title.includes(user_title);
                  });  
              }
              console.log('result is ',results);
              res.render('pages/index',{results:results, id:user_id})
            }
        }
    
    );
}
}