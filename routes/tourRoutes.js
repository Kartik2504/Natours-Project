const express = require('express');
const handler = require('../controllers/tourController');

const tourRouter = express.Router();

tourRouter
.route('/top-5-cheap')
.get(handler.aliasTopTours,handler.getAllTours);
// tourRouter.param('id',handler.checkID);

// tourRouter.param('id',(req,res,next,val)=>{     // in param middleware we get access to a fourth arguement value
//     // console.log(`Tour id is ${val}`);   // now this only prints for id in tour api not user api cause its in tour 
//     // next();                             // module this analogy works to show importance of route mounting and file structure
// })

// console.log(handler.checkBody);

tourRouter
.route('/') 
.get(handler.getAllTours) 
.post(handler.createTour);

tourRouter
.route('/:id')
.get(handler.getTourById)
.patch(handler.updateTour)
.delete(handler.deleteTour);


module.exports = tourRouter;