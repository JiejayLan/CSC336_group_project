;

module.exports = (connection) => {
  
  return (req, res) => {
      
      
      const QUERY = 
          ' SELECT *' +
          ' FROM Jobs' +
          ' WHERE;';
      
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
