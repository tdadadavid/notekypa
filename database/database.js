const config = require('../config/config');
const mysql = require('mysql2');


const database = mysql.createConnection({
    host: config.database.host,
    user: config.database.user,
    database: config.database.dbname,
    password: config.database.password
});


database.connect((err) => {
    if (err){
        console.log({ DB_NAME: err });
        console.log("Error connecting to database");
    }else{
        console.log("Successfully connected to database");
    }
})


module.exports = database;

