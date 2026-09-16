import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  mobileNumber: { type: Number, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowecase: true },
  password: { type: String, required: true, minlength: 8, trim: true },
  role: { type: String, default: "customer" },
});

export default mongoose.model("User", userSchema);
