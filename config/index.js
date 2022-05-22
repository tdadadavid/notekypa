const dotenv = require('dotenv');

dotenv.config();


const config = {

    database: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        dbname: process.env.DB_NAME,
        password: process.env.DB_PASSWORD
    },

    PORT: process.env.PORT || 8080,

}


module.exports = config;