import express from "express";
import User from "../models/auth.js";
import { generateToken } from "../utils.js";
import { protectRoute } from "../protectRoute.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (password !== user.password) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    generateToken(user._id, res);
    res.status(200).json({
      fullName: user.fullName,
      username: user.username,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/logout",async(req,res)=>{
    try {
		res.cookie("jwt", "", { maxAge: 0 });
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
})

router.get("/getme",protectRoute,async(req,res)=>{
  try {
		const user = await User.findById(req.user._id).select("-password");
		res.status(200).json(user);
	} catch (error) {
		console.log("Error in getMe controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
})



export default router;
