const express=require('express')
const router=express.Router()
const {isProductAuthor,isSeller,isLoggedIn,validateProduct} =require('../middleware');
const Product = require('../models/Product');
const User = require('../models/User');

router.get('/user/cart',isLoggedIn,async(req,res)=>{
   let user=await User.findById(req.user._id).populate('cart')
   //dont forget to populate it with cart
   const productinfo=user.cart.map((p)=>p.description).join(',');
   res.render('cart/index',{user,productinfo})
})
//adding product to cart
router.post('/user/:productId/add',isLoggedIn,async(req,res)=>{
    let{productId}=req.params;
    //this req user will only work when user is loggedin so make sure u run the is user logged in here
    let userId=req.user._id;
    let product= await Product.findById(productId)
    let user =await User.findById(userId)
    user.cart.push(product);
    //now dont forget to save this newly added product
    await user.save()
    res.redirect('/products');
})
router.get('/cart/:idd/remove',async(req,res)=>{
    let {idd}=req.params;
    let userid=req.user._id;
    let product= await Product.findById(idd)
    let user=await User.findById(userid)
    user.cart.pop(product)
    await user.save()
    res.redirect('/user/cart');
})

module.exports= router;