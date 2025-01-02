//write your model name in caital letters and in singular always 

// const { default: mongoose } = require("mongoose");
const mongoose  = require("mongoose");
const Review = require("./Review");
const { required } = require("joi");

//to make scheme go to read the docs in mongoose js now this will require mongoose automcatically and we require it in diff way
const productSchema =new mongoose.Schema({
    //now u trim your name and other things so to remove extra spaces
    name:{
        type:String,
        trim:true,//now extra spaces will be removed in the name
        required:true
    },
    img:{
        type:String,
        required:true,
        trim:true,
        // default:
    },
    price:{
        type:Number,
        required:true,
        //our price cant be negative so we specify a min value, that is 0 rupees
        min:0
    },
    description:{
        type:String,

    },
    //our product will contain a review also and we give an array of object in it as one product contains many reviews so this is "one to many database" between two models so in this review we will not store the complete review but just the id of that review and we can acces taht reviews by this id
    reviews:[
        {//tpye is the object id of the reviews it will be stored in the database and can be accesed by _id so here our type will be object id of another model so to define taht type we do:
            type:mongoose.Schema.Types.ObjectId,
            //ref means which model  are we talking about
            ref:"Review"
        }
    ],
    avgRating:{
        type:Number,
        defualt:0
    },
    author:{
        // now we can take author direclty from user model also there will be only 1 input
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
})

//so after schema and before model we write middleware of pre and post to delete reviews
//middleware jo behnd the scene mongodb operatiosn karwaen ke liye use hota hai and write this before making your model 
//now here we can use pre and post same thing only just remember it so we genereally aplly post here 
productSchema.post('findOneAndDelete',async function(product){//behind the scene our findone and delete middleware was already running when we run the commonad of findbyidanddelete now we just put a call back function here alonsigse with this middlrware
    //here product recived in fucntion argument is the product on which you applied findbyidanddelete method when u hit the delete route so u gave id into it right and that id correwsponds to that product we get that producut here
    if(product.reviews.length >0){
       await Review.deleteMany({_id:{$in:product.reviews}})
    }
})

//after all that make model
let Product=mongoose.model('Product',productSchema)
//now add the initial data by insertMany(), it accpets an array, so make array differntly then simply insert that array in insertmany

//now to intially put data in anyy collection we make a file named as "seed.js" it conatins our initial data 
module.exports = Product