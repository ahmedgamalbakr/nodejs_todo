const express=require('express');
require('express-async-errors');
const app=express();
require('dotenv').config()
require('./db')
const todoRoute= require('./routes/todoRoute')
app.use(express.json());

const port=process.env.PORT;
app.use('/todo',todoRoute)
 

app.listen(port,()=>{
    console.log("server is running in port  " + port);

});


// error handler
app.use((err,req,res,next)=>{

    err.statusCode=err.statusCode || 500 ;
    console.log('from error handler');
    res.status(err.statusCode).json({
        status:'error',
        message:err.message
        
    })

});