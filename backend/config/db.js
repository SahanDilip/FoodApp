import mongoose from "mongoose";


export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://usersahan:922660913@cluster0.9noirbf.mongodb.net/food_delevary').then(()=>{
        console.log("MongoDB Connected")
    })
}