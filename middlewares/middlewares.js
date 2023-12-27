import Jwt from "jsonwebtoken";

export const authenticateWithToken = (req,res,next) =>{
try{
req.headers.authorization &&
req.headers.authorization.startsWith("Bearer")
const token = req.headers.authorization.split(" ")[1]
if(!token){
    return res.status(403).json("you are not authenticate, token missing")
}
Jwt.verify(token, process.env.PRIVATE_KEY, (err,user)=>{
if(err){return res.status(403).json("you are not authorized");
}
req.user =user;
next();
});

}catch(error){
res.status(500).json(error)
}

}