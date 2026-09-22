import mongoose from "mongoose";

const foodSchema = mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    image: { type: String, default: "" },
    description: { type: String, default: "", trim: true },
  },
  { timestamps: true },
);

export default mongoose.model("Food", foodSchema);
