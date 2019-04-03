;

module.exports = (connection) => {
  return (req, res) => {
    let query;
    let user_location =req.query.InputLocation; 
    let user_id = req.session.user.user_ID;
    let user_type = req.session.user.type_name;
    let user_title =req.query.InputTitle;


    if((user_location === undefined||user_location === '')&&(user_title === undefined||user_title === '') ){
        console.log('no keywork for search');
        query =' SELECT job_ID, job_title, location FROM Jobs' ;
        }
    else if(user_location === undefined ||user_location === ''){
        console.log('search for title');
        query= ' SELECT job_ID, job_title, location FROM Jobs WHERE' 
        +' job_title LIKE' + '"%' + user_title + '%"'
        ; 
    }
    else if(user_title === undefined||user_title === ''){
        console.log('search for location');
        query = 
        ' SELECT job_ID, job_title, location FROM Jobs WHERE '
        +'location ='
        +'"'+user_location
        + '"'
        ' ;'; 
    }
    else{
        console.log('search for location adn title');
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
              res.render('pages/index',{results:results,user_type:user_type, user_id:user_id})
            }
        }
    
    );
}
}