const config = require('../config');
const mysql = require('mysql2');


const database = mysql.createConnection({
    host: config.database.host,
    user: config.database.user,
    database: config.database.dbname,
    password: config.database.password
});

const connectToDatabase = async () => {
    try {
        await database.connect((err) => {
            if (err) {
                console.log("An error occurred connecting to database");
                console.log({err});
            }else{
                console.log("Successfully connected to database");
            }
        });
    }catch (err){
        console.log(err);
    }
}


module.exports = {
    db: database,
    connectToDatabase
};

