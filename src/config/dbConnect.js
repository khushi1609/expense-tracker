const mongoose = require('mongoose');


const dbConnect = async() =>{
    try{
        await mongoose.connect(process.env.MONGO_URL,
        {
            // useCreateIndex : true,
            // useFindAndModifyIndex : false,
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        console.log("Connected to DB");
    }catch(error){
        console.log(`Error ${error.message}`);
    }
}

module.exports = dbConnect;