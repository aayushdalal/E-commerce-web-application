// A session is a way to store information about a user's interaction with a web application across multiple requests. It allows the server to remember the user's state and data between different pages or visits. Sessions are commonly used for things like user authentication, shopping carts, and personalized settings.
// Here's how a session typically works:
// Session Creation: When a user first interacts with a web application, the server creates a session and assigns a unique session ID.
// Session Storage: The session ID is usually stored in a cookie on the client's browser. The server stores the session data (e.g., user information, preferences) in a database or in-memory storage.
// Session Management: With each subsequent request, the client's browser sends the session ID to the server. The server uses this ID to retrieve the session data and maintain the user's state.
// Session Expiration: Sessions have a limited lifespan and will expire after a certain period of inactivity or when the user logs out.
// Sessions are essential for providing a seamless and personalized user experience on web applications.
//Signed cookies are a type of HTTP cookie that includes a digital signature to ensure the integrity and authenticity of the cookie's data. They are commonly used in web applications to securely store information on the client side, such as session identifiers or user preferences.

// Here's a breakdown of how signed cookies work:
// Creation: When a server creates a signed cookie, it generates the cookie's data and then creates a digital signature using a secret key. This signature is appended to the cookie's data.
// Storage: The signed cookie is sent to the client's browser, where it is stored like any other cookie.
// Verification: When the client sends the signed cookie back to the server (e.g., with a subsequent HTTP request), the server verifies the signature using the same secret key. If the signature is valid, the server can trust that the cookie's data has not been tampered with.

// Signed cookies help prevent tampering and ensure that the data stored in the cookie is trustworthy. They are particularly useful for maintaining secure sessions and protecting sensitive information in web applications.
const express=require('express')
const app = express()
const session=require('express-session')
//inside cookie session id is stored 
//session is key value pair storage at server side , so some memory is stored there about user like username and other things ,so whenever we send request again onto server then along with request these cookies object are also sent with it, that is stored information(cookie,in server side storage) alongisde req is sent to the server
//go to npm express session requier it and copy its middleware also secured true means signed cookies

app.use(session({
  secret: 'kya tera kya mera',
  resave: false,
  saveUninitialized: true,
//   cookie: { secure: true }
// we comment this cookie becuase it was for secuirty of our data but as now we dont need it we will need it when we deploy our project so as of now comment it
}))
app.get('/',(req,res)=>{
    res.send('welcome to session')
})
//now if u go to application in inspect inside cookie u will se the session id its a very big id 
//lets check view count that is how many times we have visited taht website
app.get('/viewcount',(req,res)=>{
    //now as your refresh the page you are again sending req to server and along with this request as you have used session middleware then therefore u will be sending a session id as well along with each req to server and server takes count of this viewcount so when same session id is recieved to server multiple it increases the viewcount therefore here session id is stored on client side on his browser where as this session count is stored on server side ,if you refresh the server then the viewcouht will again drop to 0, this is how things work my friend
    if(req.session.count){
        //means our webiste has been visited by him before 
        req.session.count+=1;
    }
    else{
        req.session.count=1;
    }
    res.send( `you visited the site ${req.session.count} times`)
})
app.get('/setname',(req,res)=>{
    req.session.username='aayush dalal'
    res.redirect('/greet')
})
app.get('/greet',(req,res)=>{
    //now either we can have username in our session or not when we hit this request
    let {username="annonymous"}=req.session;
    // here annonymous is the defaukt vakue that is if no username is returend from req.session 
    res.send(`hi from ${username}`)
})
//now the time our session shoudl stay in memory should be specified that is max age ,limit of session else it will be draining memory ,this maxage tells that till how much time our session is running and it reamins active , so generally if we dont speicfy max age this session will keep running until our server isnt refreshed but this will drain memory and slow down our webstie so our max age depends upon system to system 
app.listen(8080,(req,res)=>{
    console.log('server conneceted');
    
})

//now we cant store all users in session as if server refreshes all the information of that session is lost and therefore all users will be lost so for users the information that we want to maintain for a long time we create a seprate collection in database