import { Router } from "express";
import {
  createFood,
  deleteFood,
  editFood,
  getAllFoods,
  getFood,
} from "../controllers/food.controller.js";
import auth from "../middlewares/auth.js";
import requireRole from "../middlewares/requireRole.js";
import validateFood from "../middlewares/validateFood.js";
import {
  checkDuplicate,
  checkDuplicateOnEdit,
} from "../middlewares/checkDuplicateFood.js";
import validateRestaurantOwner from "../middlewares/validateRestaurantOwner.js";
import validateFoodOwner from "../middlewares/validateFoodOwner.js";

const router = Router();

router.get("/all", getAllFoods);
router.post(
  "/",
  auth,
  requireRole("restaurant"),
  validateRestaurantOwner,
  validateFood,
  checkDuplicate,
  createFood,
);
router.get("/:id", getFood);
router.put(
  "/:id",
  auth,
  requireRole("restaurant"),
  validateFoodOwner,
  validateFood,
  checkDuplicateOnEdit,
  editFood,
);
router.delete(
  "/:id",
  auth,
  requireRole("restaurant"),
  validateFoodOwner,
  deleteFood,
);

export default router;
