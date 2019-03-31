const express = require('express');
const mysql = require('mysql');
const session = require('express-session');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3003;
process.env.PORT = process.env.PORT || port;

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(express.static('public'));
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//  Create sessions
app.use(session({
    secret: 'temporarySecret',
    saveUnitialized: false,
    maxAge: 1000 * 60 * 5       //  5 minutes
}))
/**
 * 
 * The req object has a 'session' property that contains an Object on its
 * 'user' property. If the visitor is authenticated (through '/login'), then
 * session.user follows the following format:
 * 
 * req.session.user = {
        user_ID:    undefined for visitors
                    <int>
        
        phone_number:   <string>
        email:  <string>
                .
                .   (Other attributes in the User relation)
                .
    }
 * 
 * */
app.use((req, res, next) => {
    //  req.session.user is resetted after a specific duration of time
    //  to prevent persistent user sessions
    
    const SESSION_DURATION = 1000 * 60 ;     //  1 minute sessions
    const FIRST_VISIT = req.session.user === undefined;     //  First visit
    const SESSION_EXPIRED = Date.now() >        //  Session expired
                                req.session.start + SESSION_DURATION
    
    //  Reset session if user is visiting for the first time
    //  or session has expired
    if (FIRST_VISIT || SESSION_EXPIRED) {
        
        //  Remove user info
        req.session.user = {
            user_ID: undefined
        }
        
        //  Restart session start
        req.session.start = Date.now();
        
    } else if (!SESSION_EXPIRED) {
        
        //  Renew session start if still in session
        req.session.start = Date.now();
        
    }
    
    next()
    
})
//how to connect to aws rds on local computer
//open mysql client
//Enter:mysql -u nooredin -p -h jobfirstdatabase.c1vr39jujtbs.us-east-2.rds.amazonaws.com
//Enter:nooredin
//use mysql;


//  Read and parse credentials from file './credentials/db_credentials'
//  then create a connection to the database
const CONNECTION = mysql.createConnection(
    JSON.parse(fs.readFileSync(
        './credentials/db_credentials', 
        {encoding: 'utf-8'})))

//  Route handling.
//  Each handler is in it's own file within ./controllers
// app.get('/sign_up', require('./controllers/sign_up_controller.js')(CONNECTION));
// app.get('/sign_up_employee', require('./controllers/sign_up_employee_controller.js')(CONNECTION));
// app.get('/sign_up_employer', require('./controllers/sign_up_employer_controller.js')(CONNECTION));
app.get('/sign_up', (req, res) => {
    res.render('pages/sign_up')
});
app.get('/sign_up_employee', (req, res)=> {
    res.render('pages/sign_up_employee')
});
app.get('/sign_up_employer', (req, res)=> {
    res.render('pages/sign_up_employer')
});
app.post('/add_user/Employee', require('./controllers/add_user_employee_controller.js')(CONNECTION));
app.post('/add_user/Employer', require('./controllers/add_user_employer_controller.js')(CONNECTION));

app.get('/job_des/:job_id', require('./controllers/job_des_controller.js')(CONNECTION));
app.post('/apply/:job_id', require('./controllers/apply_controller.js')(CONNECTION));

app.get('/', require('./controllers/jobs_controller.js')(CONNECTION));
app.get('/logout', require('./controllers/logout_controller.js')(CONNECTION));
app.post('/postjob', require('./controllers/post_job_controller')(CONNECTION))

app.get('/users/:emplid', require('./controllers/get_user.js')(CONNECTION));
app.get('/users/:id/jobs', require('./controllers/get_user_jobs_controller.js')(CONNECTION));

app.get('/personal/:id', require('./controllers/personal_profile_controller.js')(CONNECTION));
app.get('/business/:id', require('./controllers/business_profile_controller.js')(CONNECTION));
app.all('/login', require('./controllers/login_controller.js')(CONNECTION))

//  API (internal?)

app.use('/api', require('./api/router.js')(CONNECTION))


// about page 
app.get('/about', function(req, res) {
	res.render('pages/about');
});


//Listen for incoming requests
const server = app.listen(port, () => {
    console.log('Server is up on local host 3003');
  })
