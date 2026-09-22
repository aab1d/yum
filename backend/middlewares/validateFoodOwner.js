import foodModel from "../models/food.model.js";
import restaurantModel from "../models/restaurant.model.js";

const validateFoodOwner = async (req, res, next) => {
  try {
    const food = await foodModel.findById(req.params.id);
    if (!food) {
      return res.status(404).json({ message: "Food not found" });
    }
    const restaurant = await restaurantModel.findById(food.restaurantId);
    if (!restaurant || restaurant.ownerId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }
    req.food = food;
    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export default validateFoodOwner;
