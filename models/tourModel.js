const mongoose = require('mongoose');

// MongoDB schema using mongoose
const tourSchema = new mongoose.Schema({
    name:{
    type: String,
    required:[true, 'A tour must have a name'],   // to get a error if name is not given, put it in array and pass a boolean and an error string
    unique: true 
    },
    rating:{
    type:Number,
    default:4.5    
    },
    price:{
    type: Number,
    required:[true, 'A tour must have a price'],
    }
});


const Tour = mongoose.model('Tour',tourSchema);

module.exports = Tour;