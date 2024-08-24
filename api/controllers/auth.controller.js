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

export const login = async (req, res) => {
    const {email, password} = req.body;
    try{

        if(!email || !password){
            return res.status(400).json({message: "All fields are required"});
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({message: "Invalid credentials"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({message: "Invalid credentials"});
        }
        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: "1h"});
        res.status(200).json({message: "Login successful", user:{
            _id: user._id,
            name: user.name,
            email: user.email
        }, token});
    } catch(err){
        res
            .status(500)
            .json({ message: "Internal server error", error: err.message });
    }
}