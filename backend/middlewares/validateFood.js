const validateFood = (req, res, next) => {
  const { name, price } = req.body;
  if (!name || !price) {
    return res.status(401).json({ message: "Food must have a name and price" });
  }
  next();
};
export default validateFood;
