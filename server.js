const express = require('express');
const app = express();
const port = 3000;
const connectDatabase = require('./DB/database');
if (process.env.NODE_ENV !== 'PRODUCTION') {
    require('dotenv').config();
  }


const pingResponseMessage = 'Bwahahah!';

app.get('/ping', (req, res) => {
    res.send(pingResponseMessage);
});

app.listen(port, () => {
    connectDatabase();
    console.log(`Server is running on localhost:${port}`);
});
