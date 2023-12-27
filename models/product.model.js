import mongoose from "mongoose";

const productSchema =new mongoose.Schema({
    p_id:{
        type: String,

    },
    p_title:{
        type: String,
    },
    p_price:{
        type: String,
    }

})
const product=mongoose.model('Product1', productSchema)
export default product;