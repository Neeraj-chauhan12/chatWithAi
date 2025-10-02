const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();


exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existsUser = await User.findOne({ email });
    if (existsUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.status(201).json({message:"register succefull", user });

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid password" });
        }

       const token=jwt.sign({id:user.id}, process.env.JWT_SECRET, { expiresIn: "10h"  });
       res.cookie("token", token, { httpOnly: true });


        res.json({ message: "Logged in successfully", user, token });
        
    } catch (error) {

        console.error(error.message);
        res.status(500).send("Server Error");
        
    }
}

exports.logoutUser = async (req, res) => { 
    try {
        res.clearCookie("token");
        res.json({ message: "Logged out successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
        
    }
 }


 exports.getUsers=async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
 }
