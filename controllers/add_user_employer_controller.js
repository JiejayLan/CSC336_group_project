const express = require('express');
const bodyParser = require('body-parser');

module.exports = (connection) => {
    return(req, res) => {
        let query;
        let query2;
        const USER_ID = Math.floor(Math.random() * 1000000000);
        const USER_NAME = req.body.username;
        const PASSWORD = req.body.password;
        const PHONE_NUMBER = req.body.phonenumber;
        const EMAIL = req.body.email;
        const BUSINESS = req.body.business;
        const ADDRESS = req.body.address;
        const USER_TYPE = 2;
        query = 
        'INSERT INTO User(user_ID, username, password, phone_number, email, user_type)'+
        'VALUES ('+ USER_ID +',' + '"'+USER_NAME+'", "' + PASSWORD+ '","' + PHONE_NUMBER +'","' 
        +  EMAIL+ '", ' + USER_TYPE  + ');'

        query2 = 
        'INSERT INTO Employer(employer_ID, business, address) VALUES ('
        + USER_ID + ',' + '"' + BUSINESS + '"' + ',' + '"' + ADDRESS + '"' + ');'
        console.log(req.body);
        console.log('user added');
        connection.query(
            query,
            (error, result, fields) => {
                if(error){
                    res.json(error)
            }
        }
        );
        connection.query(
            query2,
            (error, results, fields) => {
                if(error){
                    res.json(error)
                }  else {
                    res.redirect('/')
                }
            }
        );

        //res.redirect('/');
    };
}