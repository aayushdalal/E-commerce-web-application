# E-commerce-web-application  : https://shoproom.onrender.com
Various features such as Authentication , Validation , payemnet gateway integration, RESTFUL ROUTING, API INTEGRATION,AJAX REQUEST using axios, sessions and cookies ,used locals to make code dry instead of wet., mongodb database, flash messages on screen upon specific event, products schema their reivews,reviews schema , user schema , save functionality of a product for a user to buy it later,

Built by me with my knowledge of backend using nodejs, express, js ,ejs ,mongodb, ,reading their documentaion 

Used following dependencies :dependencies": {

    "axios": "^1.7.9", // for ajax request and api creation 
    "connect-flash": "^0.1.1", // to display flash messages when some event is executed 
    "dotenv": "^16.4.7", // for security 
    "ejs": "^3.1.10",    //for views folder 
    "ejs-mate": "^4.0.0", // used this ejs engine 
    "express": "^4.21.2", 
    "express-session": "^1.18.1", //used sessions to make track of users and their data and specified max age of a session to 1 week
    "joi": "^17.13.3", // used for server side  validation 
    "jssha": "^3.3.1", //used in payemnet gateway  
    "method-override": "^3.0.0",  // used in routing to send crud requests
    "mongoose": "^8.8.4", 
    "nodemon": "^3.1.7", 
    "passport": "^0.7.0", // used for authnetication  
    "passport-local": "^1.0.0", // used for authentication of a user 
    "passport-local-mongoose": "^8.0.0", // for authentication for username and password 
    "request": "^2.88.2", // for payment gateway integration 
    "uuid": "^11.0.3" // to generate unique id 
  }
  
 
  TO RUN THE WEB APP IN YOUR OWN PC  :copy the entire git repo, then install apply npm init -y on your pc and install npm i allFollowingDependecies given above and make sure u have mongodb and nodejs isntalled and star the project by npm start 

