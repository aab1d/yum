import userModel from "../models/user.model.js";

const checkDuplicateUser = async (req, res, next) => {
  const { email, mobileNumber } = req.body;
  const existingEmail = await userModel.findOne({ email });
  if (existingEmail) {
    return res.status(400).json({ message: "Email already in use!" });
  }
  const existingMobileNumber = await userModel.findOne({ mobileNumber });
  if (existingMobileNumber) {
    return res.status(400).json({ message: "Mobile number already in use!" });
  }
  next();
};
export default checkDuplicateUser;
