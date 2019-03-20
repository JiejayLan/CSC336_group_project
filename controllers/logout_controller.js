;


module.exports = (connection) => {
  
  return (req, res) => {
    
    const USER_IS_LOGGED_IN = req.session.user.user_ID !== undefined;
    
    //  Reset req.session.user if user is logged in
    if (USER_IS_LOGGED_IN) {
      
      req.session.user = {
        user_ID: undefined
      }
      
    }
    
    res.redirect('/')
    
  }
  
  
}