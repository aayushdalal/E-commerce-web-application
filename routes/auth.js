const express=require('express')
const router=express.Router()
const User =require('../models/User')
const passport=require('passport')
router.get('/',(req,res)=>{
    res.redirect('/products')
})
// go to npm passport local mongoose and look for static methods, now static methods are that are applicable dierctly onto our schema
router.get('/register',(req,res)=>{
    res.render('auth/signup')
})
//now to add this form to db we use post method
router.post('/register',async(req,res)=>{
    let{email,username,password,role}=req.body;
    //now to acutally registor this user ,look for register method in passport local mongoose so first arguments registor accept is a user so first we need to make a user ,that is object of model User we can create taht using js 
    const user=new User({email,username,role})//seee user details like email,username are given in user only but we will give password differnetly , as passwd will go hashed
    //now as registor is a static method which are applied on model constructors thereofere we will aplly it on model  only as model is a part of mongoose so we need await
    const newUser=await User.register(user,password)
    //now when u see response so this salt is the extra string added by hash function to make passwd unique and more secure , after adding salt to passwd then hashing is done and hash in response deisplays the encrypted passwd
    // res.send(newUser)
    //now if someone has registered then therefore we shoudl direclty be logged in instead of redirecting to login, however its upto u
    // res.redirect('/login')
    //to directly login after registering we have an object: req.login  first argument it accpet is the user we want to login and a call back function
    req.login(newUser,(error)=>{
        if(error){
            return next(error)
        }
        req.flash('success','Welcome!, you are registered successfully')
        return res.redirect('/products')
    })
})

router.get('/login',(req,res)=>{
    res.render('auth/login')
})
//now login using help of database so this is most important step, we have a user in database and we have some creditianls on basis of which authentication is done 
// router.post('/login',(req,res)=>{
//     //now look for authenticate method in middleware or in usage in passport js docs
//   passport.authenticate('local', { failureRedirect: '/login' }),
//   function(req, res) {
//     res.redirect('/');
// }
// })
//now above is the wrong way to write authentication the write way is :
router.post('/login', passport.authenticate('local', { failureRedirect: '/login' }),(req, res)=>{
    //yes just like validate first we do authenticate then we send req,res . also dont forget to require passport
    req.flash('success','Welcome back!!')    
    res.redirect('/products');
});

//now make logout , see from passport js only now take care to change post to get here as u will be sending get request to log out and not post so take caer

router.get('/logout', function(req, res, next){
    //req.logout accpets an call back function and this call back function is a must !!!
    req.logout((err)=> {
        if (err) { return next(err); }
      });
    
    req.flash('success','logged out successfully,Hope to see you soon')
    res.redirect('/products')
  });

router.get('/saved/:id',async(req,res)=>{
    let {id}=req.params;
    let products =await User.findById(id).populate('wishList')
    res.render('likedProducts',{products})
})
module.exports =router;