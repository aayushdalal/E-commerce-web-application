const Product=require('../models/Product')//requie whqat u feel necessayr
//controller says the routes we are writting so here say for product routs just copy the businesslayer , api logic the part after request remove it from there and paste it here inside a variable and at last of this file export all these variables and use them theri in routes
// const createNewProduct =router.get('/products/new',(req,res)=>{
//     try{
//     res.render('products/new')
//     }
//     catch(e){
//         res.status(500).render('error',{err:e.message})
//     }
// })now just remove the router part and you have your controller similar make controller for each routes and for all files in routes folder make spereate files in controller folder and sperate controller for each route
const createNewProduct =(req,res)=>{
        try{
        res.render('products/new')
        }
        catch(e){
            res.status(500).render('error',{err:e.message})
        }
    }
module.exports= {createNewProduct}