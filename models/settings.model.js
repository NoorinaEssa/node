import mongoose from "mongoose";

const settingSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    },
 
    name: {
        type: String,
        required: true,
    },
   

   
})
const setting = mongoose.model("Settings", settingSchema)

export default setting;