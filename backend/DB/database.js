if (process.env.NODE_ENV !== 'PRODUCTION') {
    require('dotenv').config();
}
const mongoose = require('mongoose');

const connectDatabase = ()=> {
    mongoose
        .connect(process.env.DB_URL)
        .then((data)=>{
            console.log(`Database is connected successfully: ${data.connection.host}`);
        })
        .catch((er)=> console.log('Database connection failed..',er.message));
};


module.exports = connectDatabase;