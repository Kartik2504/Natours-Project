// IMP INFO
// we'll be using named exports for each function


//////////////////////////////////////////////////////////
// const fs = require('fs');
// const express = require('express');
const Tour = require('../models/tourModel')
 
exports.aliasTopTours=(req,res,next)=>{
    // req.query = req.query || {};
    req.query.limit='5';
    req.query.sort ='-ratingsAverage,price';
    req.query.fields ='name,price,ratingsAverage,summary,difficulty';
    next(); // now here we need next, otherwise this middleware will be stuck here and won't move on :D  
}


//(NO LONGER NEEDED WAS JUST FOR TESTING PURPOSES)
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
/*
exports.checkBody = ((req,res,next)=>{
    console.log(req.body);
    if(!req.body.name||!req.body.price){    (WE'LL BE APPLYING THIS MONGOOSE NOW SO WE DON'T NEED THIS KINDA VALIDATION)
        return res.status(400).json({
            status:'failed',
            message:'Invalid body'
        })
    }
    next();
})
*/


// Route handlers
exports.getAllTours = async (req,res)=>{
  try {
    //BUILD QUERY
    // 1A) FILTERING   
    // eslint-disable-next-line node/no-unsupported-features/es-syntax
    const queryObj = {...req.query} // to make a shallow copy 
    const excludedFields = ['page','sort','limit','fields'];   // we don't want these el as queries in url
    excludedFields.forEach(el=>delete queryObj[el])
    console.log(req.query,queryObj);

    // {difficulty: 'easy',duration: {$gte:5}}  // how the query would look just for understanding purpose
    // { difficulty: 'easy', duration: { gte: '5' } } // the query we get from postman $ is missing 
    // .where('duration').equals(5).where('difficulty').equals('easy');
   
    // 1B) ADVANCED FILTERING

        // solution for missing $ operator
        let queryStr = JSON.stringify(queryObj);
        queryStr=queryStr.replace(/\b(gte|gt|lt|lte)\b/g,match=>`$${match}`);
        console.log(JSON.parse(queryStr));

        //EXECUTE QUERY
        let query = Tour.find(
            JSON.parse(queryStr)
            // queryObj
            // { duration:5,
            // difficulty:'easy'}
        );

        // 2) SORTING   sort('price') to sort on multiple basis sort('price ratingsAverage') 
        if(req.query.sort){
            const sortBy = req.query.sort.split(',').join(' ');
            query=query.sort(sortBy);
        }else{
            query=query.sort('-createdAt');
        }

        // 3) FIELD LIMITING 
        if(req.query.fields){
            const fields = req.query.fields.split(',').join(' ')
            query = query.select(fields); // this method of selecting fields in mongodb is called projecton also
        }else{                             // we can never remove id it will always be included
            query=query.select('-__v'); 
        }

        // 4) PAGINATION
        const page = req.query.page*1||1;
        const limit = req.query.limit*1||100;
        const skip = (page-1)*limit; 
        // page=2&limit=10 then we skip 10 results cause 1-10 page 1 and 11-20 page 2 
        query = query.skip(skip).limit(limit);          //there are multiple ways to implement pagination
        
        if(req.query.page){         // when the client asks for page that doesn't exist
            const numTours = await Tour.countDocuments();// this is mongoose method to get number of documents
            if(skip>numTours) throw new Error('This page does not exist')
        }    

    const allTours = await query;  //Tour.find(queryObj);
    //SEND RESPONSE
    res.status(200).json({
        'status': 'success',
        'results': allTours.length,
        'data': {
            allTours//(name of api endpoint) :  tours // variable which has data
            }
    })
    }catch(err){
        res.status(400).json({
        'status': 'failed',
        'message': err  
        })
    }
    }
    
    // console.log(req.requestTime);
    // res.status(200).json({
        // 'status': 'success',
        // results: tours.length,
        // 'data': {
        //     tours//(name of api endpoint) :  tours // variable which has data
        // }
    // });


exports. getTourById = async (req,res)=>{    // to make a api parameter optional we use ?
    try {
    // console.log(req.params);
    const id = (req.params.id); // another trick req.params.id*1
    const TourById = await Tour.findById(id);
    res.status(200).json({
        'status': 'success',
        'data': {
            TourById
        }
    }) 
    }
    catch(err){
        res.status(400).json({
        'status': 'failed',
        'message': err  
        })
    }
   
   
    // const tour = tours.find(t=>t.id===id);  // this didn't work here cause req.param WAS a string
    // if(id>=tours.length) //another way 
    //      if(!tour){
    //     return res.status(404).json({
    //         status: 'failed',
    //         message: 'Invalid id'
    //     })
    // }
    // res.status(200).json({
    //     'status': 'success',
    //     'data': {
    //         // 'tours': tour
    //     }
    // })
}

exports.createTour = async (req,res)=>{
try {
    // (INSTEAD OF DOING THIS WE'LL BE CREATING TOUR SOME OTHER WAY)   
//    const newTour = new Tour({});
//    newTour.save().then();

  const newTour =  await Tour.create(req.body)
    res.status(201).json({
        'status':'success',
        'data': {
            tour:newTour
        }
    })
}
catch(err){
    res.status(400).json({
        'status': 'failed',
        'message': err
    })    
}
}
/*
exports.createTour = (req,res)=>{
    console.log(req.body);
    const newId = tours[tours.length-1].id + 1;
    eslint-disable-next-line prefer-object-spread
    const newTour = Object.assign({id:newId},req.body);
    tours.push(newTour);
    console.log(tours);
    fs.writeFile(`${__dirname}/../dev-data/data/tours-simple.json`,JSON.stringify(tours),err=>{
        res.status(201).json({
            'status':'success',
            'data':{
                tour: newTour
            }
        })
    })
    res.send('Done');
}
*/
exports. updateTour = async (req,res)=>{
    try{
      const updatedTour = await Tour.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true
      })

        res.status(200).json({
        status:'success',
        data: {
            tour:updatedTour,
            
        }
    })
    //  if(req.params.id*1> tours.length){
    //     return res.status(404).json({
    //         status: 'failed',
    //         message: 'Invalid id'
    //     })
    // }
}catch(err){
     res.status(400).json({
        'status': 'failed',
        'message': err
    })    
}
}

exports. deleteTour = async (req,res)=>{
try{
    await Tour.findByIdAndDelete(req.params.id)
    res.status(204).json({
        status:'success',
        data: null
    })
    /* if(req.params.id*1> tours.length){
        return res.status(404).json({
            status: 'failed',
            message: 'Invalid id'
        })
    }
   */

}catch(err){
     res.status(400).json({
        'status': 'failed',
        'message': err
    })    
}
}
