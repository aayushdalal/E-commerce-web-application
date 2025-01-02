//write your model name in caital letters and in singular always 

const { required } = require("joi");
const mongoose  = require("mongoose");
const passportLocalMongoose= require('passport-local-mongoose')
//username and password will be given to our database by this plm only so dont make them in schema read the docs
// authenticate() Generates a function that is used in Passport's LocalStrategy it checks is a user is valid or not from db
// serializeUser() Generates a function that is used by Passport to serialize users into the session, serialize user means to login user that is to keep him login until he logs out(deserialise)
// deserializeUser() Generates a function that is used by Passport to deserialize users into the session, deseralise means he wants to log out , so log out the user and keep him logged out
// register(user, password, cb)  Convenience method to register a new user instance with a given password. Checks if username is unique. See login example. it is for registoring a new user ,to make a new account, first argument is always the user deatails and second argument is password because we want to hash the password 
// findByUsername() Convenience method to find a user instance by it's unique username.
// createStrategy() Creates a configured passport-local LocalStrategy instance that can be used in passport.
const userSchema =new mongoose.Schema({
    email:{
        type:String,
        trime:true,
        required:true
    },
    //now to do authorization we add role here too
    role:{
        type:String,
        required:true
    },

    cart:[
        {
         type:mongoose.Schema.Types.ObjectId,
         ref:'Product'
        }
    ],
    wishList:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Product'
        }
    ]
})
userSchema.plugin(passportLocalMongoose);
//put this userplugin after schema and before model 
let User=mongoose.model('User',userSchema)

module.exports = User