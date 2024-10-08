import foodModel from "../models/foodModel.js ";
import fs from "fs";


//add food item

const addFood = async (req, res) => {
    console.log(req.file);
    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: image_filename,
        category: req.body.category
    });
    try{
        await food.save();
        res.json({success: true, message: "Food Item Added Successfully"});
    }catch(err){
        console.log("Inside the error")
        console.log(err);
        res.status(500).json({success: false, message: err.message});
    }

}

const listFood = async (req,res) =>{
    try{
        const foods = await foodModel.find();
        res.json({success: true, data: foods});
    }catch(err){
        res.status(500).json({success: false, message: err.message});
    }
}

const removeFood= async (req,res) => {
    try{
        console.log(req.body.id);
        const food = await foodModel.findById(req.body.id);
        console.log(food);
        fs.unlink(`uploads/${food.image}`,()=>{})

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success: true, message: "Food Item Removed Successfully"});
    }catch(err){
        res.status(500).json({success: false, message: err.message});
    }
}


export {addFood,listFood,removeFood};