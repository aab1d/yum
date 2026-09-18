import mongoose from "mongoose";

const restaurantSchema = mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    address: { type: String, required: true, trim: true },
    image: { type: String, default: "" },
    description: { type: String },
  },
  { timestamps: true },
);

export default mongoose.model("Restaurant", restaurantSchema);
