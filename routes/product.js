const express=require('express')
const router=express.Router()//mini instance of our app
const Product=require('../models/Product')
const Review = require('../models/Review')
const {isProductAuthor,isSeller,isLoggedIn,validateProduct} =require('../middleware')
const {createNewProduct}=require('../controllers/product')
//now this isloggedIn this is upto us if we want this middleware to run on all these routes or not , i dont want it to run on all routes because then if user is not logged in he wont be able to view product ,our site ,so i wont write it on every reoute but will only run this middleware when the user is trying to buy something
//now as it was a named export we destructure it and we run this middleware when we add new products
//now all these routes are written inside try and catch block for server side validation 
router.get('/products',async(req,res)=>{
    //catch will run when our database is giving error 
    //to see all the products in our product model we will use following method
    try{
    let products=await Product.find()//take care await only workd with async functions
    res.render('products/index',{products});
    }
    catch(e){
        // so if our routes doesnt work then try wont work and error will be produced so to deal with that error so our apllication doesnt collapse we use catch block too
        res.status(500).render('error',{err:e.message})
        //here we render error page and we are sending error messge along with it too inside an obejct as we should so make an error page inside views folder
    }
})
//CONTROLLER:::: HERE WE WILL REMOVE THE PART AFTER REQUEST AND JUST RUN THE CONTROLLER VARIABLE AFTER REQUIRING IT
// router.get('/products/new',(req,res)=>{
//     try{
//     res.render('products/new')
//     }
//     catch(e){
//         res.status(500).render('error',{err:e.message})
//     }
// }) 
router.get('/products/new',isLoggedIn,isSeller,createNewProduct)
//here we are adding the new product so run middleware to validate the data here
router.post('/products',validateProduct,isSeller,async(req,res)=>{
    try{
        //now author here isnt coming from req body but from current logged in user
    let {name,img,price,description,}=req.body;
    await Product.create({name,img,price,description,author:req.user._id});
    req.flash('success',"Product Added Succesfully");
    res.redirect('/products')
    }
    catch(e){ 
        res.status(500).render('error',{err:e.message})
    }
})
router.get('/products/:idd',async(req,res)=>{
    try{
    let {idd}=req.params;
    let item= await Product.findById(idd).populate('reviews')
   //here we will populate the review by just adding it above take care the reviews name shoudl be the same as of in product schema
   //here we will be reciving the flash mssg in the req body sent by review router when we post a review so we will send the flash mssg as on object in render show page
   res.render('products/show',{item , success:req.flash('success')})//here msg is used to destrucutre the flash mssg and now u can flash it by show page
    }
    catch(e){
        res.status(500).render('error',{err:e.message})
    }
})
router.get('/products/:idd/edit',async(req,res)=>{
    try{
    let {idd}=req.params;
    let item = await Product.findById(idd)
    res.render('products/edit',{item})
    }
    catch(e){
        res.status(500).render('error',{err:e.message})
    }
})
router.patch('/products/:idd',isProductAuthor,validateProduct,async(req,res)=>{
    try{
    let {idd}=req.params;
    let {name,price,img,description}=req.body;
    console.log(name,price,img,description);
    
    await Product.findByIdAndUpdate(idd,{name,price,img,description})
    req.flash('success',"product edited succesfully");
    res.redirect(`/products/${idd}`);
    // this is how u pass idd in the request and render sends request by get 
    }
    catch(e){
        res.status(500).render('error',{err:e.message})
    }
})
router.delete('/products/:idd',isProductAuthor,async(req,res)=>{
    try{
    let {idd}=req.params;
    // const product = await Product.findById(idd);
    // //as reviews are array so to delete all elemtns in array we need a loop
    // for( let id of product.reviews){
    //    await Review.findByIdAndDelete(id)
    // }
    await Product.findByIdAndDelete(idd)
    req.flash('success',"Product Deleted Succesfully");
    //here before deleting product lets find product and delete all its reviews
    res.redirect('/products')
    }
    catch(e){
        res.status(500).render('error',{err:e.message})
    }
})
// now when we delete our product then together with its corresponding reviews shall also get deleted no matter how many reviews all shall get deleted so lets implement that we have two ways one easy way and anotehr production way 
//easy way is : whenever we hit route of delete that product first we will delete its reviews then we will delete the product , so thats easy as fuck
//now the production way is we can use middlewares to delete the reviews now all the middleswares we have studied until now ,app.use app.static these were all express middlewares now we will study mongoose middleware
//go to mongoose documenatiaon and read the docs and go to middleware see pre and post middleware ,pre maltab phelee post matlab badmee ,. so pre middleware runs before the middleware runs and post runs after middleware has run
//gp tp api model and you see findby id and delete , and other stuff click on it and see there is something written findOneAndremove now this is the middleware which runs behind the scene and as we need to delete reviews before find by id and delte so simply before the middleware runs we need to delete all reviews so we will use pre
//pre and post are apllied upon schema they are schema middlewares so apply them upn schema

//now u made a mistake when deletein reviews u didnt delete them from product review array so we will delete them now , these reviews are left as garbase in product review array
// for(let item of Product){
//     //no u cant just access elements of product like these u need to use find and for that u need await for await u need a call back function
// }

let deleteLeftoverReviews= async()=>{
    let products=await Product.find()
    for(let item of products){
         while(item.reviews.length>0){
            item.reviews.pop()
            //as we pop items the review lenght gets shroten
        }
        item.save()//save the updated element
    }
    
}
deleteLeftoverReviews()
module.exports =router;    