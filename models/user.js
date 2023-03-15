const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const userSchema=new Schema({
 username:String,
 password:{
    type:String,
    required:true},
 age:Number

},
{
    toJSON:{
        transform:(doc,ret)=>{
            delete ret.password;
            delete ret.__v;
            return ret;

        }
    }
})
const User=mongoose.model('user',userSchema);
module.exports=User;
