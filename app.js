require('dotenv').config();
//require this file at top , remember it
const express =require('express')
const app=express()
const path=require('path')
const mongoose = require('mongoose')
const seedDB=require('./seed')
const productrouter=require('./routes/product')
const reviewrouter=require('./routes/review')
const authrouter=require('./routes/auth')
const cartrouter=require('./routes/cart')
const productApi =require('./routes/api/product');
const ejsMate= require('ejs-mate')
const methodOverride=require('method-override')
const flash=require('connect-flash')
//also we would require middlware of connect-flash
const session=require('express-session')
const passport=require('passport')
const localStrategy=require('passport-local')
const User=require('./models/User')
//yes require user alsoo from models

//to set this new engine go to express documenatation and see application inside that see app.engine ()
app.engine('ejs',ejsMate);//so if we are looking in ejs files so ejsmates engine will look for that
app.set('view engine','ejs')//here view engine means our view engine is looking for ejs files, its not a engine actualy its a templating language(.js,.css,.html) ,its by defualt present inside our express, since we dont wwant to work with default we can bring a new engine called " ejs mate", srch on google, install npm ejs-mate ,now as its a third pary so third part makes our application better as they support better advancements, after installing ejs mate u require it
app.set('views',path.join(__dirname,'views'))
app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))


//copy middleware of expression session from npm
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    //as we are working with http request only so there is a key http only and we can also give expires and max age, expire sepcify the current date(founded by date.now() it tells us the current time and its recoridng time in evefy computer from 1970 and its in millisecond ,now say we want to expire in 7 day so we will give time in millisecond as dsat.now()+7*24*60*60*1000), in max age we only give time from now and not date now
    cookie: { 
        // secure: true 
        httpOnly:true,
        expires:Date.now()+7*24*60*60*1000,
        maxAge: 7*24*60*60*1000,

    }
  }))
//after this u can flash mssgs go to review route see documatnation of flash npm req.flash is used to flash object
app.use(flash());
//make middleware for locals


app.use(passport.initialize())
app.use(passport.session())
//after session we can use authenticaion passport and its middleware , read from passport js docs of local startagey , usage yes here function you can create of own now we will use some kind of middleware which will initialise our passport by app.use(passport.initialise()) and also app.use(passport.session()) after this u want to serialsie and deserialise so go to npm plm, and copy strategy from npm docs of passport local mongoose to how to sereialise and deserialse copy that code
// passport.use(new localStrategy(
    //this u copied from pssport js now instead of this we can use passport.use of npm plm and it will have the same function only
//   ));
passport.use(new localStrategy(User.authenticate()));

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// VERYYY IMPORTANTT make sure that this locals middleware is written at  last after all above middlewares but before router middleware 
app.use((req,res,next)=>{
    res.locals.currentUser=req.user;    
    //now we can access the logged in user information from any where
    res.locals.success=req.flash('success')
    res.locals.error=req.flash('error')
    next();
    //now make thigns corresponding to succes and errors so make a new file flash.ejs in views
})

app.use(productrouter);//so that it runs on every incoming request
app.use(reviewrouter);
app.use(authrouter);
app.use(cartrouter);
app.use(productApi);
//always keep routing middleware at bottom only
//  VERYYYY IMPORTAAAANT !!!!!!!!!! ALWWAYS TAKE CARE OF HEIRARCHY THAT FIRST YOU WILL RUN SESSION MIDDLEWARE THEN U WILL RUN FLASH MIDDLEWARE AND THEN U WILL RUN ROUTER MIDDLEWARE IF ANYTHING NOT IN THIS ORDER UR APP WILL CRASH 

//after connecting the server u will connet the db
//go to moongose js website to see code 

//dont put semicolon after when u requuire env file data!!!!!!
const dbURL=process.env.dbURL
const url= process.env.url
mongoose.connect(url)//change database name here instead of test we will write shopping and this will return a promise
.then(()=>{
    console.log('db connected succefully');
})
.catch((err)=>{
    console.log(err,'db not connected');
})

// seedDB()
//here our function runs and take care now whenever our server refreshes this file runs and dummy products get sedded so to avoid this multiple 
//so to avoud muiltiple seeding u only run this function once when your data get added after taht u will comment this function, veryy important remember to comment it else muktiple data will be added to system

//after our data is pushed onto db we need to extract data from db then we need to put get pist request
//after our db is conntected we will make now in model(collections) such as product, users,review, cart now corresponsing to every scheme we will make a new schema so yess we will have these many models
//now start making schemas of yourn database
const port = process.env.port;
app.listen(port,()=>{
    console.log(`server connected at ${port}`);
    
})

//after doing crud on our website we make code for reviews on our website so lets say we have our cart in our shopping app now divide this card database into two, one will store the customers and their id another database will sotre the cart item and its id and one customer will have link to many cart items ,so corresspongding we will fill the items in the cart item corresponding to one particular person and we will relate both of these tables by their ids as ids will be unique  now our review will contain one is rating of the product and comment and date,time
//so lets make a scehma for reviews
//after done with task of reviews and post middleware on product scheme to delete reviews now we will do validations of two kind , client side and server side ,first we will do client side validation then servr side , so for clien side validation, go to bootstrap then inside form we have validations we need to give keyword required in that input which is necessary to be validated go to new ejs to see more about it , for server side valiation we use try and catch block in routes ,see routes products  so 
//in server side validation we use a package called "JOI" its the most powerful package and used in most of the production and its a schema descriptive language it validates our data ,joi is a npm package so we need to do two steps in it , first defining a schema in it second is validating it whereever it is kept go to documentation joi.dev so make a sperate file for its schema 
//after validation(very important in production) we will do cookies and sessions then we will do authentication
//after validation we do cookies and session so a cookie is basically a  " client side storage , that is they are stored on client side not on servr side" they are a key value pair only and server sends these cookies to client and they get stored there and they go with every outgoing response/request from server , so a cookie named object is sent along that is they store some crutial information about user like say only a seller can open route for new product not user ,so cookie can keep personalisation, session-management,tracking 
//cookies are stateful and not stateless ,as as our req depends on previous request therefore our cookie is stateful ,so to manage our cookies we have a package called cookie-parser so npm i cookie-parser
//we dont have much use of cookies in our project but we will for sure use session
//now cookies are bekar cheez we have an advanced version of cookies called signed cookies these are secure , cookies are not secure as they can be seen by anone by just inspecting so whenever we are using cookies then we will use cookies but still session is more secure
//session is more secure as it is server side storage where as cookies are less secure as it is client side 
//so sensitive infomration like passwords ,ids shall be stored onto server side where as not so sensitive things such as mode theme, name location can be stoerd on cookies
//to use signed cookies u need to work with cookie parcer see docuamentaion on npm
//so not lets incorporate session inside our project
//session stores objects(key value pair) so when server gives response to client then it alongside with its send cookies now in these cookies we have particular session id , session is a server side storage  now install the package express-session in session demo, to learn about session after that we will use session in our main app, app,js
//now u remember some mssgs flash on screen , they pop up when u do something so to bring them install npm i connect-flash , go to connect-flash npm and so install npm i express-session connect-flash 
//now u were giving the pop ups ,req.flash individually to each page and router , so instead of doing this we can use locals(its the right way to give popups, flash mssg) , The res. locals is an object that contains the local variables for the response which are scoped to the request only and therefore just available for the views rendered during that request or response cycle.
//so store things in local thus make a middleware in app .js below flash and above router middleware
//now after all this we will do authentication and authorization and writing a hashing function we will do authencitaion using "passport.js" it has only one limitation that is it works for nodejs only, go passsport js and see strategies so when u login in a website then there are logins like login from google, with facebook, twiiter, github, these are called  'OAuth'so in stragetgies we have 500 oauth but we will use passport local that is local strategy so npm i passport-local 
//now for authentication we need user and for user we need name email username password stored in database so we need its schema also, right? NO! now listen u have heard that data got hacked now imagine if our this sensitive data of username and passwrd was stored in database and facebook datrabase got hacked , so they are vulenarable to threat and theft , anyone can obtain your username and passwd so we dont directly store the username and psswd in database specially password, username can still be accessed but not passwords so for the sake of privacy we first hash the passwords and after taht we store the password in our database
//hashing algo 'SHA 256' (function only) ,we give input to it and it produces an  encrypted output and now if by anyhow if u can crack this encrypted data , taht is put this encrypted data in any function and retrive the original data  then therefore the function which encyrpted our data was not the hashing fucntion, remember our hasihng function produces encrypted data that can not be hashed back.or decrypted by anyother function
// now VERYYYYYY IMPROTANT INTERVIEW QUESTION, U put psswd 123 after hashing it generated some string "aayush" now u logout and when u do login again so now in our database aayush is stored so how will this be hased back to 123 to check with our passwd, soo lets imagine there is a db and it revcives the passwd 123 and now its encrypted to aayush by our hashing function and now this hashed ,encrypted passwd gets stored in our database ,thats hwo thing works, now if u login sometime later , and u enter passwd so how will u check this psswd to the already stored passwd in database ,but as we are using sha 256 which is a hasing function so we can never retrive the input back from the output therefore it is not possible to decrypt aayush to 123 and then check so what we do is :
//so to check passwd entereed by user with the passwd stored in encrypted form in database . so our entered passd isnt checked with each entry of database, our hashing is done with parallely checking with email so psswd match only when we have give the email along with it so therefore when u login back so first email is matched with db, the email u enter taht is matched with db and after that both of the encrypted passwds are matched ,now if the encrypted psswd doenst matches then it doesnt say that your psswd is wrong .noo! but it says simply you are not an authenticated user, you are unauthenticated 
//so any unique identify acts as a key and db mathcing of passd is done wrt to this key which is not encrypted 
//in our project we will use Bcrypt for hashing and we use a strategy passport local and alonsgie with we use a technieuq called passport-local-mongoose(this tool helps in hashing)it stores password and username automatically, remember username is unique ,psswd is not unique. therefore we wont put these two fiels schema of our database  in out database, the passwd and username will be automatically added to database by plm(passport-local-machine) and we dont need to make a shcema for these two fields
//so create a user model and its schema first do npm i passport-local-mongoose passport passport-local       yes install all these three and require all three remember passport and passport local is a part of passport js ,read docs from there and passpoort local mongoose is part of npm read docs from there
//take care after u login that is after authentication a new object in request body is created called req.user , it contains all the information about user so u can access the user name ,email evrything so we will use it this way ,like we can access them directly from everywhere just like success,error stored in locals so we can access them from anywhere we store req.user in a local middleware only so we can access it from anywhere
//now after authentication we will do authorization ie :buyer and seller, so we will make two fileds in authentication one for buyer another for seller, so buyer in crud can only do r (read) and seller in crud can do all crud and sellers can be mutliple and one seller can not delete product of another seller so this is authorization 
//so when user signup we will add another field which tells of the user is buyer or seller
//now all users added before authoriszation have no role so u need to delete them all users first in your db and now only seller can see option to new ,delete old users so again we will make a middleware and place it in every request just like authentication of loggedin user
//now we will add the cart , so cart will contain ids of product tehreofre we need to build an array of cart , and cart is a unique for each user ,so make cart in user schema and alsoo write routes for cart differnetly and make seprate ejs page too
//now .env file is environment variables files, they are a npm package, so to access things from .env file we use process.env and now we dont send this .env file in gitignore so our info isnt available to public dont forget to include env file in our app.js
//.gitignore file doenst push the file on github written in this file,
// now we can put like functionality in our webiste taht is we can like products and it needs to be persistant therfore is shoudl be stored in database and we will do this with the help of ajax request therfore inside product schema we have a entry wishlist which will contain arrays of all liked product of that user so this schema will store product id that user likes and when user click once on like then product id will be added to wishlist when user again click then the productid shoudl be removed again from wishlist
//remember req.user only works when a user is logged in else it will not work so take care before using req.user if user isLogged in or not

//to add payment gateway go to payu there sign in and go to merchant hosted checkout from there go to registor for merchant hsoted checkout and register AND THEN READ THE DOCUMENTATION OF payu money payemnet gateway mayank gupta , its a linkdin blog and its vey nice to build a payemnet gateway now require two things, that is first isntall them npm i jsssha and also install npm i request and copy the entire code given in the blog 
//to acccess env file data that u want u write process.env.dataname also always require dotenv at top of our app.js and also in gitingore u always throw .env file

// now we will do mvc architecutre crete a folder controllers and make a file product.js

//For deployemnet we will be using render , make .env file first ,so we set mongodb url into our .env to make our port private and no body will be able to change our port , so make your monngodb as well as port of backend 8080 on .env
// whenever if we need to use .env then we need to install one package called npm i dotenv

// now earlier our db was locally connected to our machine now we want to store our data online so we will connect our db online , so go to atlas database mongodband creat your account 

//deploy bakcend porject on render resgiter with github : https://shoproom.onrender.com  , this is our command
//now for frontend project we will deploy it on versal