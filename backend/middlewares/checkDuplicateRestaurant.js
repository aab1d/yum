import restaurantModel from "../models/restaurant.model.js";

export const checkDuplicate = async (req, res, next) => {
  const { name } = req.body;
  const existingRestaurant = await restaurantModel.findOne({ name });
  if (existingRestaurant) {
    return res
      .status(409)
      .json({ message: "Restaurant with this name already exists" });
  }
  next();
};

export const checkDuplicateOnEdit = async (req, res, next) => {
  const { name } = req.body;
  const { id } = req.params;
  if (!name) return next();

  try {
    const existingRestaurant = await restaurantModel.findOne({
      name,
      _id: { $ne: id },
    });
    if (existingRestaurant) {
      return res
        .status(409)
        .json({ message: "Restaurant with this name already exists" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
  next();
};
