const mongoose=require("mongoose");
require("dotenv").config();
const URL=process.env.MONGO_URL;

const connectDB=async()=>{
try{
    const connectionInstance=await mongoose.connect(URL);
    console.log(`DB connection successful! DB connection instance ${connectionInstance.connection.host}`);
}catch(error){
    console.error("DB connection failed!");
    process.exit(0);
}
}

module.exports=connectDB;

// //connect db using mongo client
// const { MongoClient }=require("mongodb");
// console.log(URL, "URL");
// const client = new MongoClient(URL,{monitorCommands:true});

// // client.connect(()=>console.log("Mongo connection using mongo client successful!!!"));

// client.on('commandStarted', started => console.log(started));
// const col = client.db().collection('col1');
// col.insertOne({ name: 'spot', kind: 'dog' });
// module.exports=client;