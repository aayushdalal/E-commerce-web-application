//schema for our server side validation so first install npm i jo
//now copy schema of joi here from docs
const Joi = require('joi');
//now make schemas of your models ,take care these schemas and model scheams are different joi doesnt make model schema no this schema here is different
const productSchema = Joi.object({
    name: Joi.string().required(),
        //here we have name in our schema inmodel instead of username
    img: Joi.string().required(),
    price: Joi.string().min(0).required(),
    description: Joi.string().required()
})

const reviewSchema = Joi.object({
    rating: Joi.string().min(0).max(5).required(),
    comment: Joi.string().required()
        
})

//now just export it 
module.exports = {productSchema,reviewSchema} 
//after creating schema we will do validation that is now our this scheam will act as a middleware as if the data is validated by this schema then only it shoudl get added to our database so we will make a middleware file also