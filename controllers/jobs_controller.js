;

module.exports = (connection) => {
  // return (req, res) => {
  //   res.render('pages/index');
  // }
  return (req, res) => {
      
      
    const QUERY = 
        ' SELECT *' +
        ' FROM Jobs' ;
    
    connection.query( 
        QUERY,
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
                
              console.log('result is ',results);
                res.render('pages/index',{results:result})
            }
        }
    
    );
}
}