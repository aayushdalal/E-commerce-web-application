const express=require('express')
const router=express.Router()//mini instance of our app
const Review=require('../models/Review')
const Product=require('../models/Product')
const {validateReview}=require('../middleware')
router.post('/products/:id/review',validateReview,async(req,res)=>{
    // so just running middleware here of valdiete review does the work and our server side validation is run
    try{
    let {rating,comment}=req.body;
    let{id}=req.params;
    const product= await Product.findById(id);
    const review= new Review({rating,comment});
     //now add this review in reviews array schema of product
     product.reviews.push(review) // now u need to save this review as well as this product in our db use await because .save is a monggose function which returns a promise
     await review.save();
     await product.save();
     req.flash('success','Review added succesfully')//here mssg is the key your passing it with
     //this is how we flash mssg and now this mssg shoudl be visible where this redirect is redirecting to so on that page our mssg shoudl flash , now this mssg will be send into req body of this redirect so go to product router and at show page u will be recieving this req , so flash the mssg there
     res.redirect(`/products/${id}`);
    }
    catch(e){
        res.status(500).render('error',{err:e.message});
    }
//no after this our review will be pushed onto databse in review collction and also in our product collection we will have the object id in the review key of one the products whose review we jsut added, so an object id will be sotred in that review in product scheme now we need to render the review from this product collection
//in order to render a data of one collection from another collection so we use populate function 
})
router.delete('/products/:id/:idd',async(req,res)=>{
    let{id,idd}=req.params;
    let product= await Product.findById(id)
    await Review.findByIdAndDelete(idd);
    //NOOOWWW VERYYY VERYYYY IMPORTANTTT WHEN U DELETE A REVIEW FROM HERE IT GETS DELETED FROM THE REVIEW COLLECTION BUT REMEMBER U HAVE ALSO PUSHED THIS REVIEW IN PRODUCTS ARRAY IT STAYS THERE SO WHEN U DELETE A REVIEW MAKE SURE TO DELETE IT FROM THE product review array as well
    product.reviews.pop(idd) //pop that review from product review array
    product.save()
    res.redirect(`/products/${id}`)

})
module.exports =router;