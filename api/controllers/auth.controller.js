import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
    const {name, email, password} = req.body;
    const existingUser = await User.findOne({email});
    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    if(existingUser){
        return res.status(400).json({message: "User already exists"});
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    try{
        await user.save();
        res.status(201).json({message: "User created successfully", user:{
            _id: user._id,
            name: user.name,
            email: user.email
        }});

    }catch(err){
        res
            .status(500)
            .json({ message: "Internal server error", error: err.message });
    }
}