import  mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name : {type:String,required:true},
    email : {type:String,required:true,unique:true},
    password : {type:String,required:true},
    cartData : {type:Object,default:{}}

},{minimize : false}) // since cartData is none used this otherwise gaave error

const userModel = mongoose.model.user || mongoose.model("user",userSchema); // if model available use it otherwise create new model named user
export default userModel;