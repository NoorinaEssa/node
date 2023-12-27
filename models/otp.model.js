import mongoose  from "mongoose";


const otpSchema = new mongoose.Schema({
    email:{
        type: 'string',
    },
    otp:{
        type: 'string',
    }
})
const schema = mongoose.model('otp',otpSchema)
export default schema