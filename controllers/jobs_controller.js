;

module.exports = (connection) => {
  return (req, res) => {
    let query;
    let user_location =req.query.InputLocation; 
    let user_id = req.session.user.user_ID;
    let user_title =req.query.InputTitle;


    if((user_location === undefined)&&(user_title === undefined) ){
        query =' SELECT job_ID, job_title, location FROM Jobs' ;
        }
    else if(user_location === undefined){
        query= ' SELECT job_ID, job_title, location FROM Jobs WHERE' 
        +' job_title LIKE' + '"%' + user_title + '%"'
        ; 
    }
    else if(user_title === undefined){
        query = 
        ' SELECT job_ID, job_title, location FROM Jobs WHERE '
        +'location ='
        +'"'+user_location
        + '"'
        ' ;'; 
    }
    else{
        query= ' SELECT job_ID, job_title, location FROM Jobs WHERE' 
        +' job_title LIKE' 
        + '"%' + user_title 
        + '%"'
        +'AND '
        +'location ='
        +'"'+user_location+ '"'
        ' ;';       
    }
    connection.query( 
        query,
        (error, results, fields) => {
            if (error) {
                console.log(error)
                res.json(error)
            } else {
            //   console.log('result is ',results);
              res.render('pages/index',{results:results, id:user_id})
            }
        }
    
    );
}
}