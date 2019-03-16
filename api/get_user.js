;

module.exports = (connection) => {
  return (req, res) => {
      
      const USER_EMPLID = req.params.emplid;
      const GET_USER_QUERY = 
          ' SELECT *' +
          ' FROM User' +
          ' ;';
      
      connection.query(
          
          GET_USER_QUERY,
          
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

