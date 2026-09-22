import foodModel from "../models/food.model.js";

export const checkDuplicate = async (req, res, next) => {
  const { name } = req.body;
  const existingFood = await foodModel.findOne({
    name,
    restaurantId: req.body.restaurantId,
  });
  if (existingFood) {
    return res.status(409).json({ message: "Food already exists" });
  }
  next();
};

export const checkDuplicateOnEdit = async (req, res, next) => {
  const { name } = req.body;
  const { id } = req.params;
  if (!name) return next();

  try {
    const existingFood = await foodModel.findOne({
      name,
      restaurantId: req.food.restaurantId,
      _id: { $ne: id },
    });
    if (existingFood) {
      return res.status(409).json({ message: "Food already exists" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
  next();
};
