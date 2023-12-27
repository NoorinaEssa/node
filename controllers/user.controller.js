import User from "../models/user.model.js"
import bcrypt from "bcrypt"
import jsonwebtoken from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import crypto from "crypto"
import Otp from '../models/otp.model.js'

//register
export const register = async (req, res) => {

    try {
        console.log("Called")
        const { email, password, name, gender } = req.body
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(401).json({ message: "User Already exists" });
        }
        const hashPassword = await bcrypt.hash(password, 10)

        const newUser = new User({ email, name, gender, password: hashPassword });
        await newUser.save()
        res.status(201).json(newUser)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//login form
export const login = async (req, res) => {
    try {
        console.log("Called");
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(404).json({ message: "User does not exist" });
        }
        
        const passwordMatch = await bcrypt.compare(password, user.password);
        
        if (!passwordMatch) {
            return res.status(401).json({ message: "Password does not match" });
        }
       
        const token = jsonwebtoken.sign(
            { userId: user._id, useremail:user.email}, "SKJDHSKD655454SLKDJSISJCIOSSD56FF5DD54D5VCCDVC45DV45", { expiresIn: "24h" });
        
        res.status(200).json({user,token });
        token:token
       
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//get All Users

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
        if (!users) {
            return res.status(404).json({ message: "User not found" })
        }
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//get Single User

export const getSingleUSer = async (req, res) => {
    try {
        const { id } = req.params;

        const singleUser = await User.findById(id)
        if (!singleUser) {
            return res.status(404).json({ message: "User Not Found" })
        }
        res.status(200).json(singleUser)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
//update Users
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findByIdAndUpdate(id, req.body, {
            new: true
        })
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


//deleteSingleUser
export const deleteSingleUser = async (req, res) => {

    try {
        const { id } = req.params
        const user = await User.findByIdAndDelete(id)
        if (!user) {
            return res.status(404).json({ message: "USer Not Found" })
        }
        res.status(200).json({ message: "Successfully Deleted USer" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// nodemailer
export const forgetPassword = async (req, res) => {
    try{
    const {email} = req.body
       const user = await User.findOne({ email})
 if(user){
     const transporter = nodemailer.createTransport({
  service: "gmail",
  auth:{ user:"noorinashedev@gmail.com",
   pass:"lhsr dswj ldpg wbqp"
    }
  })
   const otp = crypto.randomBytes(3).toString('hex')
     const mailOptions = {
    from:"noorinashedev@gmail.com",
   to:email,
    subject:"password reset otp",
   text:`your Otp is ${otp}`
    }
    transporter.sendMail(mailOptions)
    const user=new Otp({

        email,otp
    
    })
    
    await user.save()
    res.status(200).json({message:"otp send successfully"})
      }
    }
    catch(error){
           res.status(500).json({message:error.message})
    }
}

export const varifyOtp = async(req, res)=>{
    try{const {email,otp,newPassword}=req.body;
    const otpverify=await Otp.findOne({email,otp})

    if(!otpverify){
        return res.status(400).json({message:"Invalid OTP"})
    }
    const hashPassword= await bcrypt.hash(newPassword,10);
    await User.updateOne({email},{$set:{password:hashPassword}});
    await Otp.deleteOne({email})
    res.status(200).json({message:"password updated successfully"});
}catch(error) {
res.status(501).json({message:error.message});
}
}