import Settings from "../models/settings.model.js";

export const createSetting = async (req, res) => {

    try {
        console.log("Called")
        const { name, userId } = req.body
       
        const newSetting = new Settings({  name, userId });
        await newSetting.save()
        res.status(201).json(newSetting)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
export const getAllSettings=async(req, res) => {
    try {
        // const settings =await Settings.find().populate("userId") // to populate the whole data
        const settings = await Settings.find().populate({path:"userId", select:"email password"})
        if(!settings) {
            return res.status(404).json({message: "Settings not found"})
        }
        res.status(200).json(settings)
    } catch (error) {
        res.status(200).json({message:error.message}) 
    }
}