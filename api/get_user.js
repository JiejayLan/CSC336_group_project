;

module.exports = (connection) => {
  return (req, res) => {
      
      const USER_EMPLID = req.params.emplid;
      
      const QUERY = 'SHOW DATABASES;'
      /*
      const GET_USER_QUERY = 
          ' SELECT *' +
          ' FROM Test' +
          ' WHERE EmplId=' + USER_EMPLID +
          ';';*/
      
      connection.query(
          
          QUERY,
          
          (error, results, fields) => {
              if (error) {
                  console.log(error)
                  res.json(error)
              } else {
                  res.json(results)
              }
          }
      
      );
  }
}

