const validateUser = (req, res, next) => {
  const { firstName, lastName, email, password, mobileNumber } = req.body;
  if (!firstName || !lastName || !email || !password || !mobileNumber) {
    return res.status(400).json({ message: "Fill complete details" });
  }
  next();
};

export default validateUser;
