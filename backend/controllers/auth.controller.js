import bcrypt from "bcrypt";
import "dotenv/config";
import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET;

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User not Found!" });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Wrong password!" });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "1hr",
    });
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        mobileNumber: user.mobileNumber,
        role: user.role,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Login failed!" });
  }
};
export const register = async (req, res) => {
  const { firstName, lastName, email, password, mobileNumber, role } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    const user = await userModel.create({
      firstName,
      lastName,
      email,
      password: hashed,
      mobileNumber,
      role,
    });
    res.status(201).send(`REGISTRATION SUCCESSFULL ${user}`);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Registration failed!" });
  }
};
