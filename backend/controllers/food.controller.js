import foodModel from "../models/food.model.js";

export const getAllFoods = async (req, res) => {
  try {
    const { restaurantId, page, limit } = req.query;
    const filter = req.query.restaurantId
      ? { restaurantId: req.query.restaurantId }
      : {};
    const query = foodModel
      .find(filter)
      .populate("restaurantId", "name address");

    if (page && limit) {
      const pageNum = parseInt(page);
      const limitNum = parseInt(limit);
      const skip = (pageNum - 1) * limitNum;

      const [data, total] = await Promise.all([
        query.skip(skip).limit(limitNum),
        foodModel.countDocuments(filter),
      ]);

      return res.send({
        data,
        currentPage: pageNum,
        totalPages: Math.ceil(total / limitNum),
      });
    }
    const data = await query;
    res.send(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to fetch foods" });
  }
};

export const createFood = async (req, res) => {
  const { name, price, image, description } = req.body;
  try {
    await foodModel.create({
      name,
      restaurantId: req.restaurant._id,
      price,
      image: image || "",
      description: description || "",
    });
    res.status(200).json({ message: "Food created" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to create food" });
  }
};
export const getFood = async (req, res) => {
  try {
    const data = await foodModel
      .findById(req.params.id)
      .populate("restaurantId", "name address");
    if (!data) {
      return res.status(404).json({ message: "Food not found" });
    }
    res.send(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to fetch food" });
  }
};
export const editFood = async (req, res) => {
  const { name, price, image, description } = req.body;
  try {
    const updated = await foodModel.findByIdAndUpdate(
      req.params.id,
      { name, price, image, description },
      {
        returnDocument: "after",
        runValidators: true,
      },
    );
    if (!updated) {
      return res.status(404).json({ message: "Food not found" });
    }
    res.status(200).json({ message: "Food updated" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to update food" });
  }
};
export const deleteFood = async (req, res) => {
  try {
    await foodModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Food deleted" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to delete food" });
  }
};
