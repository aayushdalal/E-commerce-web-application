//write your model name in caital letters and in singular always 

const mongoose  = require("mongoose");

//to make scheme go to read the docs in mongoose js now this will require mongoose automcatically and we require it in diff way
const reviewSchema =new mongoose.Schema({
    //now u trim your name and other things so to remove extra spaces
    rating:{
        type:Number,
        required:true,
        min:0,
        max:5
    },
    comment:{
        type:String,
        trim:true,
        required:true
    }
    // there is also a functionality of timestamp the computer reocrds time of that moment it is either true or false
},{timestamps:true})//in second object send timestampt it will give u time at which it was created and time at which it was updated to display it u need to convert to datestring , srch how to do taht on google
let Review=mongoose.model('Review',reviewSchema)

module.exports = Review