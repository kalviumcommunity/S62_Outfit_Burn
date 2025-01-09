const express = require('express');
const app = express();
const port = 3000;
const connectDatabase = require('./DB/database');
const getDb=require('./DB/mongo-client')
app.use(express.json());

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
    updatedConnectionDatabase();
    console.log(`Server is running on localhost:${port}`);
});
