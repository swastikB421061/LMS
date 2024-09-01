import express from "express"
import env from "dotenv"
import connectMongoDB from "./db/connectDB.js";
import authRoutes from "./routes/authRoutes.js"
import listRoutes from "./routes/listRoutes.js"
import cookieParser from "cookie-parser";

const app=express();
env.config();

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser());

app.get('/',(req,res)=>{
    res.send("hello");
})

app.use("/api/auth",authRoutes);
app.use("/api/list",listRoutes);



app.listen(process.env.PORT,()=>{
    console.log(`server running on port ${process.env.PORT}`)
    connectMongoDB();
})