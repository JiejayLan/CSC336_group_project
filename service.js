const express = require('express');
const mysql = require('mysql');
const session = require('express-session');
const app = express();
const port = process.env.PORT || 3003;

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(session({
    secret: 'temporarySecret',
    saveUnitialized: true
}))
app.use((req, res, next) => {
    
    if (req.session.info === undefined) {
        
        req.session.user = {
            user_ID: undefined
        }
        
    }
    
    console.log(req.session.user)
    
    next()
})

const CONNECTION = mysql.createConnection({
    host: 'jobfirstdatabase.c1vr39jujtbs.us-east-2.rds.amazonaws.com',
    user: "nooredin",
    password: 'nooredin',
    port: 3306,
    database: 'job_first'
})

//  Route handling.
//  Each handler is in it's own file within ./controllers
app.get('/', require('./controllers/index_controller.js')(CONNECTION));
app.get('/users/:id/jobs', require('./controllers/get_user_jobs_controller.js')(CONNECTION));
app.all('/login', require('./controllers/login_controller.js')(CONNECTION))

//  API
app.use('/api', require('./api/router.js')(CONNECTION))


// about page 
app.get('/about', function(req, res) {
	res.render('pages/about');
});


//Listen for incoming requests
app.listen(port, () => {
    console.log('Server is up!');
  });