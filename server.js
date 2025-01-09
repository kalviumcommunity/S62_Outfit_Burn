const express = require('express');
const app = express();
const port = 3000;
const connectDatabase = require('./DB/database');
const {getDb, connection}=require('./DB/mongo-client')
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
    // Check the database connection status
    const checkStatus = await connection.connect();
    const readyState = connection.topology.isConnected()
      ? 'connected'
      : 'disconnected';

    

    res.send(`<h3>Database Connection Status : ${readyState}</h3>`);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
app.get('/user', async (req, res)=>{
    try {
        const db=await getDb()
        const userData= await db.find().toArray();
        return res.status(200).send(userData)
    } catch (error) {
        return res.status(500).send({message: error.message})
    }
})
app.post('/', async(req,res)=>{
    try {
        const db=await getDb()
        const insertData= await db.insertOne({...req.body})
        return res.status(201).send({message: 'Created user',insertData })
    } catch (error) {
        return res.status(500).send({message: error.message}) 
    }
})
app.delete('/:id',async (req,res)=>{
    try {
        const db=await getDb()
        const {id}= req.params;
        const deleteUser=await db.findOneAndDelete({_id: id})
        return res.status(200).send({message:'Deleted successfully', deleteUser})
        
    } catch (error) {
        return res.status(500).send({message: error.message})
    }
})
app.put('/:id', async (req,res)=>{
    try {
        const db=await getDb()
        const {id}=req.params;
        const updateuser= await db.findOneAndUpdate({_id: id}, {$set: req.body}, { returnDocument: 'after' });
        return res.status(200).send({message: 'Updated successfully',updateuser})
    } catch (error) {
        return res.status(500).send({message: error.message})
    }
})

app.listen(port, () => {
    console.log(`Server is running on localhost:${port}`);
});
