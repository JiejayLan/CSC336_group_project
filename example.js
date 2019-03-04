var express = require('express');
var mysql = require('mysql');
var app = express();
var outputString = "";
const port = process.env.PORT || 3001;
app.engine('html', require('ejs').renderFile);


const query_test_create = 'CREATE TABLE Test(EmplId INT, Name varchar(100), HireDate varchar(100));'
const query_test_select = 'SELECT * FROM Test ORDER BY EmplId;';
const query_test_insert = 'INSERT INTO Test (EmplId, Name, HireDate) VALUES (343, "jie", "5-20");';

var connection = mysql.createConnection({
    host: 'jobfirstdatabase.c1vr39jujtbs.us-east-2.rds.amazonaws.com',
    user: "nooredin",
    password: 'nooredin',
    port: 3306,
    database: 'jobfirst_database'
});

connection.connect(function(err)
{
    console.log("connecting");
    if (err) {
        console.log(err);
        // app.locals.connectionerror = err.stack;
        return;
    }
});




app.get('/', function(req, res) {

    connection.query(query_test_select, (error, results, fields) => {
        console.log(results);
        if (error) {
            throw error;
        }
    });

});

app.use(express.static('public'));

//[5] Listen for incoming requests
app.listen(port, () => {
    console.log('Server is up!');
  });