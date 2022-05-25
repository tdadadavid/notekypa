const config = require('./config');
const { connectToDatabase } = require('./database');
const app = require('./app');


connectToDatabase();

app.listen(config.PORT, () => { console.log(`Server running at ${config.PORT}`); });
