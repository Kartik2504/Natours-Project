// IMP INFO
// we'll be using named exports for each function


//////////////////////////////////////////////////////////
// const fs = require('fs');
const Tour = require('../models/tourModel')
 
//(NO LONGER NEEDE WAS JUST FOR TESTING PURPOSES)
// const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`,'utf8'));

// param middleware to validate id
/*
exports.checkID = ((req,res,next,val)=>{
     console.log(`Tour id is ${val}`);
    if(req.params.id*1> tours.length){
        return res.status(404).json({
            status: 'failed',
            message: 'Invalid id'
        })
    }
    next();    
});
*/
exports.checkBody = ((req,res,next)=>{
    console.log(req.body);
    if(!req.body.name||!req.body.price){
        return res.status(400).json({
            status:'failed',
            message:'Invalid body'
        })
    }
    next();
})



// Route handlers
exports.getAllTours = (req,res)=>{
    console.log(req.requestTime);
    res.status(200).json({
        // 'status': 'success',
        // results: tours.length,
        // 'data': {
        //     tours//(name of api endpoint) :  tours // variable which has data
        // }
    });
}

exports. getTourById = (req,res)=>{    // to make a api parameter optional we use ?
    // console.log(req.params);
    const id = Number(req.params.id); // another trick req.params.id*1
    // const tour = tours.find(t=>t.id===id);  // this didn't work here cause req.param WAS a string
    // if(id>=tours.length) //another way 
    //      if(!tour){
    //     return res.status(404).json({
    //         status: 'failed',
    //         message: 'Invalid id'
    //     })
    // }
    res.status(200).json({
        'status': 'success',
        'data': {
            // 'tours': tour
        }
    })
}

exports.createTour = (req,res)=>{
    // console.log(req.body);
    // const newId = tours[tours.length-1].id + 1;
    // eslint-disable-next-line prefer-object-spread
    // const newTour = Object.assign({id:newId},req.body);
    // tours.push(newTour);
    // console.log(tours);
    // fs.writeFile(`${__dirname}/../dev-data/data/tours-simple.json`,JSON.stringify(tours),err=>{
    //     res.status(201).json({
    //         'status':'success',
    //         'data':{
    //             tour: newTour
    //         }
    //     })
    // })
    // res.send('Done');
}

exports. updateTour = (req,res)=>{
    //  if(req.params.id*1> tours.length){
    //     return res.status(404).json({
    //         status: 'failed',
    //         message: 'Invalid id'
    //     })
    // }
   
    res.status(200).json({
        status:'success',
        data: {
            tour:'<updated tour here!>'
        }
    })
}

exports. deleteTour = (req,res)=>{
    /* if(req.params.id*1> tours.length){
        return res.status(404).json({
            status: 'failed',
            message: 'Invalid id'
        })
    }
   */
    res.status(204).json({
        status:'success',
        data: null 
    })
}
