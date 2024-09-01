import express from "express";
import Student from "../models/user.js";
import { generateToken } from "../utils.js";
import { protectRoute } from "../protectRoute.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { collegeID, password } = req.body;
    console.log(collegeID,password);
    const user = await Student.findOne({ collegeID });
    if (password !== user.password) {
      return res.status(400).json({ error: "Invalid collegeID or password" });
    }

    generateToken(user._id, res);
    res.status(200).json({
      fullName: user.fullName,
      collegeID: user.collegeID,
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
		const user = await Student.findById(req.user._id).select("-password");
		res.status(200).json(user);
	} catch (error) {
		console.log("Error in getMe controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
})



  router.post("/update/:id",protectRoute,async (req, res) => {
    try {
      const { id } = req.params;
      const toupdate = await Student.findById(id);
      // console.log(toupdate,id,req.body.status);  
      if (!toupdate) {
        return res.status(404).json({ error: "Student not found" });
      }
      const purpose = req.body.purpose;
      const from = req.body.from;
      const to = req.body.to;
      if(!purpose || !to ||!from){
        return res.status(404).json({ error: "all fields required" });
      }
      toupdate.to=to;
      toupdate.from=from;
      toupdate.purpose=purpose;
      toupdate.permission="Pending";
      toupdate.applied="1";
      toupdate.mess="";
      await toupdate.save();  
      res.status(200).json({ message: "Applied successfully" });  
    } catch (error) {
      console.log("Error in updateUser: ", error.message);
      res.status(500).json({ error: error.message });
    }
  });

  router.get("/:id",protectRoute,async (req, res) => {
    try {
        const { id } = req.params;
        const response = await Student.findById(id).select("-password");
      res.status(200).json(response);
    } catch (error) {
      console.log("Error in fetching details: ", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });


export default router;
