import { Router } from "express";
import {
  createRestaurant,
  deleteRestaurant,
  editRestaurant,
  getAllRestaurants,
  getRestaurant,
} from "../controllers/restaurant.controller.js";
import validateRestaurant from "../middlewares/validateRestaurant.js";
import {
  checkDuplicate,
  checkDuplicateOnEdit,
} from "../middlewares/checkDuplicateRestaurant.js";
import auth from "../middlewares/auth.js";
import requireRole from "../middlewares/requireRole.js";
import validateOwner from "../middlewares/validateOwner.js";
const router = Router();

router.get("/all", getAllRestaurants);
router.post(
  "/",
  auth,
  requireRole("restaurant"),
  validateRestaurant,
  checkDuplicate,
  createRestaurant,
);
router.get("/:id", getRestaurant);
router.put(
  "/:id",
  auth,
  requireRole("restaurant"),
  validateOwner,
  validateRestaurant,
  checkDuplicateOnEdit,
  editRestaurant,
);
router.delete(
  "/:id",
  auth,
  requireRole("restaurant"),
  validateOwner,
  deleteRestaurant,
);

export default router;
