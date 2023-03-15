const express=require('express');
const Todo = require('../models/todo');
const User = require('../models/user');
const router=express.Router();
const bcrypt= require('bcrypt');
const Joi = require('joi');
const jwt=require('jsonwebtoken');
const verify = require('../middleware/verify');
const { validateSignUp, validateLogin } = require('../middleware/valiadator');
const CustomError = require('../helpers/customeError');

const jwtSecret= process.env.JWTSECRET;


// get todos by id
// router.get('/:id',async(req,res,next)=>{
    
//         const todosByid=await Todo.findById(req.params.id);
//         res.send(todosByid);
    
// })


//get todos by queryStringvalues
// router.get('/',async(req,res,next)=>{
//    let queryStringparams={};
//    queryStringparams=req.query;
   
//        const todosBystatus=await Todo.find(queryStringparams);
//        res.send(todosBystatus);
    
// })



// signup todoUser
router.post('/signUp',validateSignUp,async(req,res,next)=>{
  
    const {username,password,age}= req.body

        const hashedPassword= await bcrypt.hash(password,12)
        const createUser= new User({
            username,
            password:hashedPassword,
            age
          
        });
     await createUser.save();
     res.send(createUser) 

    


})



//login
router.post('/login',validateLogin,async(req,res,next)=>{

    const {username,password}=req.body;
  
        const toDoUser=await User.findOne({username});
        if(!toDoUser)
       {
         throw new CustomError("invalid credentials",400);
       }

        const isMatch= bcrypt.compare(password, toDoUser.password)
        if(!isMatch)
        {
            throw new CustomError("invalid credentials",400);

        }

        const payload={id:toDoUser._id}
        const token = jwt.sign(payload,jwtSecret)

        res.json(
            {
                message:"logged in",
                token,
                toDoUser
            }
        )

        
  
})

//create todos 
router.post('/',verify,async(req,res)=>{
	const todo = await Todo.create({
		title:req.body.title,
		status:req.body.status,
		user: req.user._id
	})

	res.send(todo)

})

// get todos for only user that login 
router.get('/',verify,async(req,res,next)=>{
   
       // console.log(req.user._id);
        const todosByUsereId=await Todo.find({user:req.user._id});
        res.send(todosByUsereId);
   
})

//update todo
router.patch('/:id',
verify  //middleware to verify user
,async(req,res,next)=>{

    await Todo.findByIdAndUpdate(req.params.id,req.body);
    console.log('update success');


})



// delete todo
router.delete('/:id',
verify
,async(req,res,next)=>{

        await Todo.findByIdAndDelete(req.params.id);
        console.log('delete succcess');

    
})


module.exports = router;
