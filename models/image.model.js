import mongoose from "mongoose";

const imagesSchema = new mongoose.Schema({
    
    image: {
        type: String,
    }
    
})
const imageData = mongoose.model("images", imagesSchema)

export default imageData;