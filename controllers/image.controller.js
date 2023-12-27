// import { response } from "express";
import imageData from "../models/image.model.js";

export const ImageUploading=async(req,res)=>{
    try {
        console.log(req.body)
        const newImage= new imageData({
            image: req.file? req.file.filename:undefined,
        })
        await newImage.save()
        res.status(200).json({image:newImage})

    } catch (err) {
        // console.log(error)
        res.status(500).json(err.message)
    }
}