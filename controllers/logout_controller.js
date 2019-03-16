module.exports = (connection) => {
    return (req, res) => {

        delete req.session.user
        console.log('logout');
        res.redirect('/login')
    }
}