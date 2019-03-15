const express = require('express');
const mysql = require('mysql');
const app = express();
const port = process.env.PORT || 3003;

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

const query_test_create = 'CREATE TABLE Test(EmplId INT, Name varchar(100), HireDate varchar(100));'
const query_test_select = 'SELECT * FROM Test ORDER BY EmplId;';
const query_test_insert = 'INSERT INTO Test (EmplId, Name, HireDate) VALUES (343, "jie", "5-20");';

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
app.get('/users/:emplid', require('./controllers/get_user.js')(CONNECTION));
app.get('/users/:id/jobs', require('./controllers/get_user_jobs_controller.js')(CONNECTION));


// about page 
app.get('/login', function(req, res) {
	res.render('pages/login');
});

// about page 
app.get('/about', function(req, res) {
	res.render('pages/about');
});



app.use(express.static('public'));

//Listen for incoming requests
app.listen(port, () => {
    console.log('Server is up!');
  });