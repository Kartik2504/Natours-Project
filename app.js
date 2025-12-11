const express = require('express');
const fs = require('fs');

// standard procedure
const app = express();

app.use(express.json());

/*
// BASIC ROUTING IN EXPRESS
app.get('/',(req,res)=>{
    // res.status(200).send('hello world');
    // another method to send data
    res.status(200).json({message: 'hello world from json method', app:'Natours'});   
}) 
app.post('/',(req,res)=>{
    res.send('Yon can post to this endpoint');
})
*/

// this is called route handler
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`,'utf8'));
// console.log(tours);


app.get('/api/v1/tours', (req,res)=>{
    res.status(200).json({
        'status': 'success',
        results: tours.length,
        'data': {
            tours//(name of api endpoint) :  tours // variable which has data
        }
    });
})

// Getting tour by id in url
app.get('/api/v1/tours/:id',(req,res)=>{    // to make a api parameter optional we use ?
    // console.log(req.params);
    const id = Number(req.params.id); // another trick req.params.id*1
    const tour = tours.find(t=>t.id===id);  // this won't work here cause req.param is a string
    // if(id>=tours.length) another way 
         if(!tour){
        return res.status(404).json({
            status: 'failed',
            message: 'Invalid id'
        })
    }
    
    // console.log(tour);
    res.status(200).json({
        'status': 'success',
        'data': {
            'tours': tour
        }
    })
})


// in this post request the data that client sends to server should be available on req object but,
// out of the box express does not put that body data on req, to have that data available we use middleware.
app.post('/api/v1/tours',(req,res)=>{
    // console.log(req.body);
    const newId = tours[tours.length-1].id + 1;
    const newTour = Object.assign({id:newId},req.body);
    tours.push(newTour);
    // console.log(tours);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,JSON.stringify(tours),err=>{
        res.status(201).json({
            'status':'success',
            'data':{
                tour: newTour
            }
        })
    })
    // res.send('Done');
})

// NOT IMPLEMENTING (can try later)
app.patch('/api/v1/tours/:id',(req,res)=>{
     if(req.params.id*1> tours.length){
        return res.status(404).json({
            status: 'failed',
            message: 'Invalid id'
        })
    }
   
    res.status(200).json({
        status:'success',
        data: {
            tour:'<updated tour here!>'
        }
    })
})


app.delete('/api/v1/tours/:id',(req,res)=>{
     if(req.params.id*1> tours.length){
        return res.status(404).json({
            status: 'failed',
            message: 'Invalid id'
        })
    }
   
    res.status(204).json({
        status:'success',
        data: null 
    })
})

const port = 3000;
app.listen(port,()=>{   // we are not specifying a path or url here to test this we do it using postman instead of opening 
    console.log(`App running on port ${port}...`); // the server again and again.
})