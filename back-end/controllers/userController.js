import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import validator from "validator"



//login 
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User does not exists" })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Password is incorrect" })
        }
        const token = createToken(user._id);
        res.json({ success: true, token: token, message: "Login Successfull" })
    }
    catch (err) {
        console.log(err);
        res.json({ success: false, message: "Error" })
    }
}


//generating token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" })
}


//register user
const registerUser = async (req, res) => {
    const { name, password, email } = req.body;
    try {
        //check if user exists
        const exists = await userModel.findOne({ email })
        if (exists) {
            return res.json({ success: false, message: "User exists" })
        }
        //validating email format & strong password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Enter valid email" })
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Password must be at least 8 characters long" })
        }
        //hashing passsword
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        //creating user
        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword
        })
        //saving user
        const user = await newUser.save()
        const token = createToken(user._id)
        response.json({ success: true, token })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

export { loginUser, registerUser }