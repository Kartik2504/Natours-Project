const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const Tour = require('../../models/tourModel'); 

dotenv.config({path:'../../config.env'});  // this connects node app to .env file in file system

const DB = process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD);

mongoose.connect(DB,{
    // useNewUrlParser:true,
    // useCreateIndex:true,
    // useFindAndModify:false
}).then(()=>{
    // console.log(con.connections)
    console.log(`DB connection successful`);
})

// read json file 
const data = JSON.parse(fs.readFileSync('./tours-simple.json','utf-8'));
// console.log(data);

// Import data into database
const ImportData = async ()=>{
try{
await Tour.create(data)     // .create method accepts data in an array
console.log('Data Successfully Loaded');
}catch(err){
    console.log(err);
}
process.exit();
}

// delete all data from collections

const deleteData = async ()=>{
try{
    await Tour.deleteMany()
    console.log('successfully deleted');
    
}
catch(err){
    console.log(err);
}
process.exit();
}
// making a small script so that this program can be executed on the command line easily
if(process.argv[2]==='--import'){
    ImportData();
}else if(process.argv[2]==='--delete'){
    deleteData();
}

console.log(process.argv); //node.js feature that allows you to read command line arguments