import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import 'dotenv/config'



//app config
const app = express()
const port = process.env.PORT || 4000;




//middleware

app.use(express.json()) // we pass json data to the server
app.use(cors()) // we can make request from frontend to backend

//db config
connectDB();

//api endpoints

app.use("/api/food",foodRouter)
app.use("/images", express.static("uploads")) // to access the images from the uploads folder
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)


app.get("/", (req,res)=>{
    res.send("Api Working")
})

app.listen(port, ()=> { // listen to the port
    console.log(`Server Running on http://localhost:${port}`) 
})

//mongodb+srv://usersahan:922660913@cluster0.9noirbf.mongodb.net/?

//retryWrites=true&w=majority&appName=Cluster0