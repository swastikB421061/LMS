import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		collegeID: {
			type: String,
			required: true,
			unique: true,
		},
		fullName: {
			type: String,
		},
        password: {
			type: String,
			required: true,
			minLength: 6,
		},
		purpose: {
			type: String,
		},
        from: {
			type: String,
		},
        to: {
			type: String,
		},
		applied: {
			type: String,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		permission: {
			type: String,
			unique:false,
		},
		mess: {
			type: String,
		}
		
    },
	{ timestamps: true }
);

const Student = mongoose.model("Studen", userSchema);

export default Student;
