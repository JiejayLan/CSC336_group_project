;

module.exports = (connection) => {
  return (req, res) => {
      console.log(req.params)
      const USER_EMPLID = req.params.emplid;
      const GET_USER_QUERY = 
          ' SELECT *' +
          ' FROM Test' +
          ' WHERE EmplId=' + USER_EMPLID +
          ';'
      
      connection.query(
          
          GET_USER_QUERY,
          
          (error, results, fields) => {
              if (error) {
                  console.log(error)
                  res.error()
              } else {
                  res.json(results)
              }
          }
      
      );
  }
}

