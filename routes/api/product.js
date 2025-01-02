const express=require('express')
const router =express.Router();
let {isLoggedIn}=require('../../middleware')
const User= require('../../models/User')

router.post('/product/:productId/like' ,isLoggedIn, async(req,res)=>{
    let {productId}= req.params;
    let user = req.user;
    let isLiked = user.wishList.includes(productId);
    //now we will add this product inside our wishlist array soo can u see the work we used to do with form, sending a post rqeuest ,instead of that form we sent post request by axios and here instead of re-renderig the whole page using routing we are using our own api as we are sending ajax request using axios so isnted of route we are using apis to deal with the request
    //now if product id already there then remove it when button is clicked if it is not there in wihslist then add it so we will be deleting elements from an array to do this we can use following methods
    const option = isLiked? '$pull' : '$addToSet';//ternianry opertor on mongodb methods
    // here pulll and addtoset are mongodb methods remmeber thy are mongodb mehtod and not mongoose 
    //The $pull operator removes from an existing array all instances of a value or values that match a specified condition.
    //The $addToSet operator adds a value to an array unless the value is already present, in which case $addToSet does nothing to that array.
    //so yesss these are better than pushing and poping element in the array also by push we can push one elemnet mulitple times but here we dont want that so here we are using pull and addtoset method only , take care use methods according to thier use , in cart u can not use these two methods as they dont match with the functionality of the cart
    req.user= await User.findByIdAndUpdate(req.user._id, {[option]:{wishlist:productId}},{new:true})
    
    //now in all mongodb methods such as findbyidandupdate ,delete remove ,replace after perfomring their task they return the old document that is changes aren visible so to make them return the new updated document the changed we made to be visible we use an third argumnet new:true
    //remember we cant do here User.save as because
    //document.save(): This method is used to save a document to the database. If the document is new, it will be inserted into the collection. If the document already exists, it will be updated.
    // new:true does is :This argument is used in the findOneAndUpdate method to return the updated document instead of the original document.
    //basically if you are using findBy method then u will use new:true else u will be using document.save()
    res.send('work done')
});
module.exports =router;