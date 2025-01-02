const {productSchema,reviewSchema}=require('./schema')
// const {Product}=require('./models/Product') VERYYYYYY IMPORTAAAANTT DONT DO MISTAKES LIKE THESEEEE YOUR PRODUCT WAS DEFAULT EXPORT SO U CANT DESTRUCTURE IT
const Product=require('./models/Product')
//now our middleware accpets three argumetns ,req,res and next and we have middleware for both product and review schema 
const validateProduct=(req,res,next)=>{
  console.log('validate product running');
  
//req.body contains all infomartion about the data to be validated 
  let{name,img,price,description} =req.body;
   const {err,val}=productSchema.validate({name,img,price,description})
  //now this returns u two things one an error and other a value now as we are validating so we dont need value 
  if(err){//if everything was right then no err was generated hence undefined is assignet to err here  
    return res.render('error',{err})//redirect to error page and send error
  }
  next();
}
const validateReview=(req,res,next)=>{
    let {rating,comment}=req.body;
    let {err}= reviewSchema.validate({rating,comment})
    if(err){
        return res.render('error',{err})
    }
    next();
}
//NOW WE CAN ALSO A CREATE A MIDDLEWARE THAT IF OUR USER IS NOT LOGGED IN THEN WE WONT BE ABLE TO SEE THE PRODUCTS ,ITS OUR CHOICE SO WE WILL DO THAT BY :
const isLoggedIn=(req,res,next)=>{
  //Definition. The IsAuthenticated property is a boolean value that indicates whether the current user is authenticated (logged in). The property value is a boolean true if the current user is authenticated, otherwise false
  if(!req.isAuthenticated || !req.user){
    window.location.replace('/login');
    // res.redirect('/login') this res.redirect wasnt working so we used a shortcuttttt big brain moment ,note this down in mistakes challenges u faced while making the project
    //now u wont allow this person to go ahead if he is not logged in so we will return from here
  }
  next()
}
//now perosnally i dont want to use this middleware becuase i think even if user is not logged in he can still view items he shoudl login only when he is buying so i am making this islogged in to be activated when he is byuing products else not so we will not run this middleware in other routes of product or review 

const isSeller=(req,res,next)=>{
  if(req.user.role !=='seller'){
    console.log('chal gya');
    
    req.flash('error','you dont have the permission to do that')
    return res.redirect('/products')
  }
  next();
}
//now we will make a middleware if that user is product author or not so he can delete or edit things or not
const isProductAuthor=async(req,res,next)=>{
  
  let {idd}=req.params//now find the product based on this id when u delete, so check your delete this id should you are destrucutring shoudl be same
  let product = await Product.findById(idd)
  //when u compare two objects id then u have a method called equals, remember we cant compare id by ===
  if(!product.author.equals(req.user._id)){
    req.flash('error','you dont have the permission to do that')
    return res.redirect('/products')
  }
  next();
}
//now we need to use both of these middleware in our routes whenever we are adding or editing a new product in our routes 
module.exports ={isProductAuthor,isSeller,isLoggedIn, validateProduct,validateReview}