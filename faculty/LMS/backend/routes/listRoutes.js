import express from "express";
import Student from "../models/studentList.js";
import { protectRoute } from "../protectRoute.js";

const router = express.Router();

router.get("/",protectRoute,async (req, res) => {
  try {
    const list = await Student.find({applied:"1"}).sort({ createdAt: -1 });
    if (list.length === 0) {
      return res.status(200).json([]);
    }
    res.status(200).json(list);
  } catch (error) {
    console.log("Error in fetching details: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/last",protectRoute,async (req, res) => {
  try {
    const list = await Student.find({}).sort({ updatedAt: -1 }).limit(10);
    if (list.length === 0) {
      return res.status(200).json([]);
    }
    res.status(200).json(list);
  } catch (error) {
    console.log("Error in fetching details: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/:id",protectRoute,async (req, res) => {
    try {
      const { id } = req.params;
      const toupdate = await Student.findById(id);
      // console.log(toupdate,id,req.body.status);  
      if (!toupdate) {
        return res.status(404).json({ error: "Student not found" });
      }
      const val = req.body.status;
      const data = req.body.message;
      console.log(val,data);
      toupdate.permission = val;
      toupdate.mess=data;
      toupdate.applied="0";
      await toupdate.save();  
      res.status(200).json({ message: "Student updated successfully" });  
    } catch (error) {
      console.log("Error in updateUser: ", error.message);
      res.status(500).json({ error: error.message });
    }
  });
  

export default router
