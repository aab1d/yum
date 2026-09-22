import restaurantModel from "../models/restaurant.model.js";

const validateRestaurantOwner = async (req, res, next) => {
  try {
    const { restaurantId } = req.body;
    if (!restaurantId) {
      return res.status(400).json({ message: "restaurantId is required" });
    }
    const restaurant = await restaurantModel.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    if (restaurant.ownerId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }
    req.restaurant = restaurant;
    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export default validateRestaurantOwner;
