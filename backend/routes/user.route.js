const express=require('express');
const {getDb}=require('../DB/mongo-client');
const app=express.Router();
const { ObjectId } = require('mongodb');


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
        const db=await getDb();
        const {id}= req.params;
        const deleteUser=await db.deleteOne({_id: new ObjectId(id)});
        return res.status(200).send({message:'Deleted successfully', deleteUser})
        
    } catch (error) {
        return res.status(500).send({message: error.message})
    }
})
app.put('/:id', async (req,res)=>{
    try {
        const db=await getDb();
        const {id}=req.params;
        const updateuser= await db.updateOne({_id: new ObjectId(id)}, {$set: {...req.body}});
        return res.status(200).send({message: 'Updated successfully',updateuser})
    } catch (error) {
        return res.status(500).send({message: error.message})
    }
})
module.exports=app;