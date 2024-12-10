const express = require('express');
const app = express();
const port = 3000;

const pingResponseMessage = 'Bwahahah!';

app.get('/ping', (req, res) => {
    res.send(pingResponseMessage);
});

function logMessage(message) {
    console.log(message);
}

app.listen(port, () => {
    logMessage(`Server is running on localhost ${port}`);
});
