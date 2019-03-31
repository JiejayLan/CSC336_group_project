
module.exports = (connection) => {

    return (req, res) => {
        console.log(req.body);
        console.log(req.params);
        res.render('pages/sign_up');
    };
}