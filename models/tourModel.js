const mongoose = require('mongoose');

// MongoDB schema using mongoose
const tourSchema = new mongoose.Schema({
    name:{
    type: String,
    required:[true, 'A tour must have a name'],   // to get a error if name is not given, put it in array and pass a boolean and an error string
    unique: true,
    trim:true 
    },
    duration:{
      type:Number,
      required:[true,'A tour must have a duration']  
    },
    maxGroupSize:{
     type:Number,
     required:[true,'A tour must have a group size']
    },
    difficulty:{
     type:String,
     required:[true,'A tour must have a difficulty']
    },
    ratingsAverage:{
    type:Number,
    default:4.5    
    },
    ratingsQuantity:{
    type:Number,
    default:0
    },
    price:{
    type: Number,
    required:[true, 'A tour must have a price'],
    },
    priceDiscount:Number,
    summary:{     
    type:String,
    trim:true,
    required:[true, 'A tour must have a summary'],
    },
    description:{
        type:String,
    },
    imageCover:{
        type:String,    // it will only store the name of the image i.e only the refrence will be saved
        required:[true, 'A tour must have a cover image'], 
    },
    images:{
        type:[String]      // an array of strings
    },
    createdAt:{
        type:Date,
        default: Date.now()
    },
    startDates:[Date]
    });


const Tour = mongoose.model('Tour',tourSchema);

module.exports = Tour;