import User from "../models/userModel.js";
import bcrypt from "bcrypt";

import { generateAccessToken } from "../helpers/jwtToken.js";

// Signup controller
 export const signupController = async (req, res) => {
  try {
   
    const {
      firstName,
      lastName,
      email,
      role,
      mobile,
      address,
      gender,
      dob,
      city,
      state,
      country,
      password,
    } = req.body;

    // Check if user already exists with given email 
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with Email number already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
    ...req.body,
      password: hashedPassword,
    });

    await newUser.save();

  

  return  res.status(201).json({ newUser });
  } catch (error) {
    console.error(error);
  return  res.status(500).json({ message: "Internal server error" });
  }
};


  export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare the given password with the stored hashed password
    const validatePassword = await bcrypt.compare(password, user.password);

    if (!validatePassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // If the email and password are valid, generate an access token for the user
    const token = generateAccessToken(user);
    

      let resp = {
        username: `${user.firstName} ${user.lastName}`,

        role: user.role,
      };
    // Set the token in a cookie
    res.cookie("access_token", token, {
      httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    // Set the role in a cookie
    res.cookie("role", resp.role, {
      httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
  
   return res.status(200).json(resp);
  } catch (error) {
    console.log(error);
   return res.status(500).json({ message: "Something went wrong",});
  }
};



