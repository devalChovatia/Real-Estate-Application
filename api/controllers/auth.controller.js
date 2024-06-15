import User from "../models/user.js";
import bycryptjs from "bcryptjs"

export const signup =  async (req, res) =>{

    const { username, email, password} = req.body;
    const hashedPassword = bycryptjs.hashSync(password, 12);
    const newUser = new User({username, email, password: hashedPassword})

    try {
        await newUser.save();
        res.status(201).json("User created successfully")
        
    } catch (error) {
        res.status(500).json("Error Regarding User Creation Is: ", error.message)
    }

}

