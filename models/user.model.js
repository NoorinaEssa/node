import mongoose from "mongoose";

const userSchema =new mongoose.Schema({
    name:{
        type: 'string',

    },
    email:{
        type: 'string',
    },
    password:{
        type: 'string',
    }

})
const user=mongoose.model('User', userSchema)
export default user;