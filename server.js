const express = require('express');
const app = express();
const port = 3000;
const {connection}=require('./DB/mongo-client')
app.use(express.json());

if (process.env.NODE_ENV !== 'PRODUCTION') {
    require('dotenv').config();
  }
  const pingResponseMessage = 'Bwahahah!';    
app.get('/ping', (req, res) => {
    res.send(pingResponseMessage);
});
app.get('/', async (req, res) => {
  try {
    const checkStatus = await connection.connect();
    const readyState = connection.topology.isConnected()
      ? 'connected'
      : 'disconnected';

    

    res.send(`<h3>Database Connection Status : ${readyState}</h3>`);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
app.use('/user-router', require('./routes/user.route'))

app.listen(port, () => {
    console.log(`Server is running on localhost:${port}`);
});
