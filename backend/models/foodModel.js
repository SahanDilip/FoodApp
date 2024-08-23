import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name: {type : String,required:true},
    description : {type : String,required:true},
    price : {type : Number,required:true},
    image : {type : String,required:true},
    category : {type : String,required:true},
})


const foodModel = mongoose.models.food || mongoose.model("Food",foodSchema); // if the model is already created then use that model else create a new model


export default foodModel;

