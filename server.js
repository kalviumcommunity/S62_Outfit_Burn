const express = require('express');
const app = express();
const port = 3000;
const connectDatabase = require('./DB/database');
if (process.env.NODE_ENV !== 'PRODUCTION') {
    require('dotenv').config();
  }
let dbConnectionStat= 'Not connected';

const updatedConnectionDatabase= async()=>{
    try {
        const connectionData=await connectDatabase();
        dbConnectionStat=`Database is connected successfully`
    } catch (error) {
        dbConnectionStat = `Database connection failed: ${error.message}`;
    }
}

const pingResponseMessage = 'Bwahahah!';

app.get('/ping', (req, res) => {
    res.send(pingResponseMessage);
});
app.get('/', (req, res) => {
    res.send(`Database Connection Status: ${dbConnectionStat}`);
});

app.listen(port, () => {
    updatedConnectionDatabase();
    console.log(`Server is running on localhost:${port}`);
});
