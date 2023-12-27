import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser";
import router from "./routes/user.route.js";
import productRoutes from "./routes/product.route.js"
import dotenv from 'dotenv'
dotenv.config()

const app= express();
const PORT=3000 ||process.env.PORT;
const username=process.env.USER
const password=process.env.PASSWORD
app.use(bodyParser.json());
app.use("/api",router);
app.use("/api",productRoutes)

app.use("/", userRouter1)
import userRouter1 from "./routes/image.route.js";



mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.ggvk4fm.mongodb.net/TestDb`).then(()=>{
    console.log("Connected to db")})

app.listen(PORT,()=>{
    console.log(`listening on PORT ${PORT}`); 
})