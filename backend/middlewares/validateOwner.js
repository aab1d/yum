import restaurantModel from "../models/restaurant.model.js";
const validateOwner = async (req, res, next) => {
  try {
    const data = await restaurantModel.findById(req.params.id);
    if (!data) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    if (data.ownerId.toString() != req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export default validateOwner;
