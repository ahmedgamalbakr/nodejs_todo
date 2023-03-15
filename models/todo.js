 const mongoose=require('mongoose');
 const Schema=mongoose.Schema;


 const todoSchema=new Schema({
    title:String,
    status:String,
    user:{
      type:Schema.Types.ObjectId,
      required:true,
      ref:'User'
    }
 })


 const Todo=mongoose.model('Todo',todoSchema);

 module.exports=Todo;


