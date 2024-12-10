const express = require('express');
const app = express();
const port = 3000;

const pingResponseMessage = 'Bwahahah!';

app.get('/ping', (req, res) => {
    res.send(pingResponseMessage);
});

app.listen(port, () => {
    console.log(`Server is running on localhost:${port}`);
});
