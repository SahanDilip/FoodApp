import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe"; // Use this import for ES modules
import dotenv from "dotenv";
dotenv.config();

// Initialize Stripe using your secret key from environment variables

const stripe_key = process.env.STRIPE_SECRET_KEY;
console.log("Stripe Key",stripe_key);
const stripe = new Stripe(
  stripe_key,
);
const frontend_url = "http://localhost:5173";

const placeOrder = async (req, res) => {
  try {
    // Log the incoming request body to debug any issues
    // console.log("Incoming Order Request Body:", req.body);

    // Create a new order and save it in the database
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });

    // Log the new order data
    // console.log("New Order Created:", newOrder);

    await newOrder.save();

    // Clear user's cart after placing the order
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    // Create line items for Stripe session
    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100, // Correctly handle price in cents (no need for *80 unless currency conversion)
      },
      quantity: item.quantity,
    }));

    // Add delivery charge as a line item
    line_items.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 200, // $2.00 delivery fee (200 cents)
      },
      quantity: 1,
    });

    // console.log("Line Items for Stripe:", JSON.stringify(line_items, null, 2));

    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify/?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify/?success=false&orderId=${newOrder._id}`,
    });

    // Respond with the Stripe session URL for redirection
    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error("Order placement error:", error); // Log the error for debugging
    res
      .status(500)
      .json({
        success: false,
        message: error.message || "Order placement failed.",
      });
  }
};

const verifyOrder = async(req,res)=>{
  const{orderId,success}=req.body;
  try {
      if(success=="true"){
          await orderModel.findByIdAndUpdate(orderId,{payment:true});
          res.json({success:true,message:"paid"})
      }
      else{
      await orderModel.findByIdAndDelete(orderId);
      res.json({success:false,message:"Not paid"})
      }
  } catch (error) {
      console.log(error);
      res.json({success:false,message:"Error"})
  }
}

const userOrders = async(req,res)=>{
  try {
      const orders = await orderModel.find({userId:req.body.userId});
      res.json({success:true,data:orders})
  } catch (error) {
      console.log(error);
      res.json({success:false,message:"Error"})
  }
}

//listing orders from admin panel
const listOrders= async(req,res)=>{
  try {
      const orders = await orderModel.find({})
      res.json({success:true,data:orders})
  } catch (error) {
      console.log(error)
      res.json({success:false,message:"Error"})
  }
}

//api for updating order status
const updateStatus = async(req,res)=>{
  try {
      await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
      res.json({success:true,message:"status Updated"})
  } catch (error) {
      console.log(error);
      res.json({success:false,message:"ERROR"})
  }
}

export { placeOrder, verifyOrder,userOrders,listOrders,updateStatus };
