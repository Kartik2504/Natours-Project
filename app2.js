// REFACTORING THE CODE
const express = require('express');
// const fs = require('fs');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

// standard procedure
const app = express();
// 1) MIDDLEWARES
app.use(express.json()); // here, use adds global middleware
app.use(morgan('dev')); // third party middleware used to log details about every HTTP request that hits server
app.use(express.static(`${__dirname}/public`)) // this is used to access static files in our file system without creating their route

app.use((res,req,next)=>{
    console.log('hello from the middleware');
    next(); // this is important funtion to call to keep the req-res cycle working
})

app.use((req,res,next)=>{
    req.requestTime = new Date().toISOString();
    next();
})

// this is called route handler
// const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`,'utf8'));

// 2) ROUTE HANDLERS
//REFACTORING ROUTE HANDLER INTO A SEPERATE FUNCTIONS
/*const getAllTours = (req,res)=>{
    console.log(req.requestTime);
    res.status(200).json({
        'status': 'success',
        results: tours.length,
        'data': {
            tours//(name of api endpoint) :  tours // variable which has data
        }
    });
}

const getTourById = (req,res)=>{    // to make a api parameter optional we use ?
    // console.log(req.params);
    const id = Number(req.params.id); // another trick req.params.id*1
    const tour = tours.find(t=>t.id===id);  // this didn't work here cause req.param WAS a string
    // if(id>=tours.length) //another way 
         if(!tour){
        return res.status(404).json({
            status: 'failed',
            message: 'Invalid id'
        })
    }
    res.status(200).json({
        'status': 'success',
        'data': {
            'tours': tour
        }
    })
}

const createTour = (req,res)=>{
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
}

const updateTour = (req,res)=>{
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
}

const deleteTour = (req,res)=>{
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
}

const getAllUsers = (req,res)=>{
    res.status(500).json({
        status: 'error',
        message: 'this route is not yet defined'
    })
}

const getUserById = (req,res)=>{
    res.status(500).json({
        status: 'error',
        message: 'this route is not yet defined'
    })
}

const createUser = (req,res)=>{
    res.status(500).json({
        status: 'error',
        message: 'this route is not yet defined'
    })
}

const updateUser = (req,res)=>{
    res.status(500).json({
        status: 'error',
        message: 'this route is not yet defined'
    })
}

const deleteUser = (req,res)=>{
    res.status(500).json({
        status: 'error',
        message: 'this route is not yet defined'
    })
}
*/

// 3) ROUTES
//////////////////////////////////////////////////////////////////////////////
// app.get('/api/v1/tours',getAllTours);
// Getting tour by id in url
// app.get('/api/v1/tours/:id',getTourById);
// in this post request the data that client sends to server should be available on req object but,
// out of the box express does not put that body data on req, to have that data available we use middleware.
// app.post('/api/v1/tours',createTour);
// NOT IMPLEMENTING (can try later)
// app.patch('/api/v1/tours/:id',updateTour);
// app.delete('/api/v1/tours/:id',deleteTour);

// we create another different router so that later we can put these similar routes on one single router

/*
const tourRouter = express.Router();
const userRouter = express.Router();

// another way to write a route here, we can also chain post request here,
tourRouter
.route('/') // just / route cause of route mouting *remember, this is imp*
.get(getAllTours)
.post(createTour);
// for other http methods
tourRouter
.route('/:id')
.get(getTourById)
.patch(updateTour)
.delete(deleteTour);
/////////////////////////////////////////////////////////////////////////
// implementing users api
userRouter
.route('/')
.get(getAllUsers)
.post(createUser)
userRouter
.route('/:id')
.get(getUserById)
.patch(updateUser)
.delete(deleteUser);
*/
app.use('/api/v1/tours',tourRouter);
app.use('/api/v1/users',userRouter);
// 4) SERVER
/*
const port = 3000;
app.listen(port,()=>{   // we are not specifying a path or url here to test this we do it using postman instead of opening 
    console.log(`App running on port ${port}...`); // the server again and again.
})*/

module.exports = app;