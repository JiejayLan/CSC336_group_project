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
              console.log('result is ',results);
                res.render('pages/index')
            }
        }
    
    );
}
}