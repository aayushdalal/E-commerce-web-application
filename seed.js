const mongoose = require('mongoose')
//any file related to our database will conatain require mongoose
const Product=require('./models/Product');

const products=[
    {
        name:'phone',
        img:"https://plus.unsplash.com/premium_photo-1680459838836-a8433c8f664e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGhvbmV8ZW58MHx8MHx8fDA%3D",
        price:130000,
        description:"very costly "
    },
    {
        name:'headphone',
        img:"https://plus.unsplash.com/premium_photo-1679513691474-73102089c117?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aGVhZHBob25lfGVufDB8fDB8fHww",
        price:1000,
        description:"buy it dude"
    },
    {
        name:"tv",
        img:"https://plus.unsplash.com/premium_photo-1681236323432-3df82be0c1b0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dHZ8ZW58MHx8MHx8fDA%3D",
        price:9000,
        description:"full hd and oled display"

    },
    {
        name:'laptop',
        img:'https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wfGVufDB8fDB8fHww',
        price:700000,
        description:"you can learn coding on it"
    },
    {
        name:'tab',
        img:'https://www.jiomart.com/images/product/original/492573487/lenovo-tab-k10-26-16-cm-10-3-inch-tablet-4-gb-ram-64-gb-abyss-blue-tb-x6c6x-digital-o492573487-p590910745-0-202111270119.jpeg?im=Resize=(1000,1000)',
        price:20000,
        description:'might be useful for you online classes'
    }
]
//now to insert the intiial data , our array in the database we can make a functin seed

//remeber !!!!!! all insert many , inserrt one, save, connect they all mongoose methods returns promise! and to avoid promise chainign we do async await
// async function seedDB(Model,data){
//    await Model.insertMany(data);
//    //await because mongoose methods returns a promise
//    console.log('data added succefully');
// }

// seedDB(Product,products);

// VERYYY IMPORTANT:!!!!this was the wrong of writing code as you are running your fucntion here noooo DONT DO THAT  as nodemon only runs the main js file, app.js or index.js and this seed files isnt run by nodemon on change in our project so u will export this seed function to your app file and call the seed function there 
async function seedDB(){
    // await Product.deleteMany(), u can do this to make sure multiple data is not sotred but but but tbis can create problems when working with reviews so dont run this line here 
    await Product.insertMany(products);
    console.log('data added succesfully');
}
module.exports = seedDB