const validateRestaurant = (req, res, next) => {
  const { name, address } = req.body;
  if (!name || !address) {
    return res
      .status(401)
      .json({ message: "Restaurant must have a name and address" });
  }
  next();
};
export default validateRestaurant;
