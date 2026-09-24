import restaurantModel from "../models/restaurant.model.js";

export const getAllRestaurants = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const query = restaurantModel
      .find()
      .populate("ownerId", "firstName lastName email");

    if (page && limit) {
      const pageNum = parseInt(page);
      const limitNum = parseInt(limit);
      const skip = (pageNum - 1) * limitNum;

      const [data, total] = await Promise.all([
        query.skip(skip).limit(limitNum),
        restaurantModel.countDocuments(),
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
    return res.status(500).json({ message: "Failed to fetch restaurants" });
  }
};

export const createRestaurant = async (req, res) => {
  const { name, address, image, description } = req.body;
  try {
    await restaurantModel.create({
      name,
      ownerId: req.user.id,
      address,
      image: image || "",
      description: description || "",
    });
    res.status(200).json({ message: "Product created" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to create restaurant" });
  }
};

export const getRestaurant = async (req, res) => {
  try {
    const data = await restaurantModel
      .findById(req.params.id)
      .populate("ownerId", "firstName lastName email");
    if (!data) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    res.send(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to fetch restaurant" });
  }
};

export const editRestaurant = async (req, res) => {
  try {
    const updated = await restaurantModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        returnDocument: "after",
        runValidators: true,
      },
    );
    if (!updated) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    res.status(200).json({ message: "Restaurant updated" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to update restaurant" });
  }
};

export const deleteRestaurant = async (req, res) => {
  try {
    await restaurantModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Restaurant deleted" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to delete restaurant" });
  }
};
