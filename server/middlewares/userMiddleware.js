const jwt =require('jsonwebtoken')
const redisClient =require('../services/redis.service')

exports.AuthMiddleware=async(req,res,next)=>{
try{
 const token=req.Cookies.token || req.headers.authorization.split(' ')[1];
   if(!token){
       return res.status(401).json({message:"unauthorized access"})
   }

   const isBlackListed=await redisClient.get(token);

   if(isBlackListed){
    return res.status(401).json({message:"unauthorized access"})
   }

    const decoded=jwt.verify(token,process.env.JWT_SECRET);
    req.user=decoded;
    next();
    
   } catch (error) {
     return res.status(401).json({message:"invalid token"})
    
   }
}