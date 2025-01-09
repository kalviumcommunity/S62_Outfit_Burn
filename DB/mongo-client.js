if (process.env.NODE_ENV !== 'PRODUCTION') {
    require('dotenv').config();
}
const mongoClient=require('mongodb').MongoClient;
const connection= new mongoClient(process.env.DB_URL);
async function getDb(){
    let db=connection.db('ASAP');
    db= db.collection('users');
    return db;
}
module.exports={getDb, connection}