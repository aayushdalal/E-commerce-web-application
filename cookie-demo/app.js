//Cookies are typically stored on the client side, meaning they are saved in the user's web browser. When a server sends a cookie to a client's browser, the browser stores it and sends it back to the server with each subsequent request to the same domain. This allows the server to recognize the user and maintain session information.

// However, there are also server-side cookies, which are stored on the server and not sent to the client's browser. These are less common and are usually used for more secure or sensitive information that should not be exposed to the client.

// In summary:

// Client-side cookies: Stored in the user's web browser.

// Server-side cookies: Stored on the server

// When you create an account or log in to a website, your password is sent to the server, where it is usually hashed (converted into a fixed-length string of characters) and stored securely in a database. This way, even if someone gains unauthorized access to the database, they won't be able to see your actual password.

// Here's a brief overview of the process:

// User enters password: You enter your password on the login page.

// Password hashing: The server hashes the password using a cryptographic algorithm.

// Storage: The hashed password is stored in the server's database.

// Verification: When you log in again, the server hashes the password you enter and compares it to the stored hash. If they match, you are authenticated.

// This method ensures that passwords are not stored in plain text and adds an extra layer of security
const express= require('express');
const app=express()
const cookieParser=require('cookie-parser')
app.use(cookieParser('youneedabettersecrett'));
//run this middleware to work with signed cookies, send a string inside it 
app.get('/',(req,res)=>{
    console.log(req.cookies);

    // res.send(req.cookies)
    //to se all signed cookies we can use ,remember we cant see signed cookies in inspect 
    res.send(req.signedCookies)

})
//now to send cookies, thereofre we send it alongside response
app.get('/setcookie',(req,res)=>{
    res.cookie('mode','dark');
    //it sotres the dark mode of site
    res.cookie('location','delhi')
    //it sotres the lcoation of user
    res.cookie('username','aayush')
    //now we will send the response
    res.send('server sent your cookies')
    //these cookies are sotred in inspect then go to application in there we can see many things such as local storage cookies, so go to cookies and there u can see all your cookies
})
//to see all cookies lets create a new route
app.get('/getcookies',(req,res)=>{
    let{mode,location,username}=req.cookies;
    //as multiple cookies so we do res.cookies and not cookie
    res.send(`hi my name is ${username} and i stay in ${location} and i love ${mode} theme`)
})
app.get('/getsignedcookies',(req,res)=>{
    res.cookie('bindas','sachin',{signed:true})
    //now as it is a signed cookie so we want no one else can see this cookie 
    res.send('cookie send succesfully');
})
app.listen(8080,()=>{
    console.log('server connected ');
    
})