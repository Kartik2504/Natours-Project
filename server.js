// we create this file to put everything releated to server this will be our starting point
// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({path:'./config.env'});  // this connects node app to .env file in file system

const DB = process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD);

mongoose.connect(DB,{
    // useNewUrlParser:true,
    // useCreateIndex:true,
    // useFindAndModify:false
}).then(con=>{
    // console.log(con.connections)
    console.log(`DB connection successful`);
})
/*
// CREATING A TOUR 
const testTour = new Tour({
    name: 'The Park Camper',
    // rating: 4.7,
    price:777 
})
testTour.save().then(doc=>{     // testTour.save() returns a promise that we can consume.
    console.log(doc);
}).catch(err=>{
    console.log(`Error:`,err);
});
*/

const app = require('./app2');
// this tells about current environment variable i.e development 
console.log(app.get('env')); // this env is based on express right now

// to get environment variable in node's context we use:-
// console.log(process.env);
console.log(process.env.port);
console.log(process.env.user);

const port = 3000;
app.listen(port,()=>{   // we are not specifying a path or url here to test this we do it using postman instead of opening 
    console.log(`App running on port ${port}...`); // the server again and again.
})