const jwt=require('jsonwebtoken');
const Todo = require('../models/todo');
const User = require('../models/user');
const jwtSecret= process.env.JWTSECRET;

module.exports=async(req,res,next)=>{
 
    const token=req.headers.authorization;
    if(!token)
    {
        const error=new Error("invalid user")
        error.status=400;
        return next(error);
    }
    
    //  verify the token
    const {id}=jwt.verify(token,jwtSecret);
    
    const todoUser= await User.findById(id);
    if(!todoUser){
        const error=new Error("unauthorized user")
        error.status=403;
        return next(error);
    }
    //console.log(todoUser);
    req.user=todoUser;
    next();
         
    }
    