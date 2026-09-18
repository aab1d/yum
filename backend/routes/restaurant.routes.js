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
const router = Router();

router.get("/all", getAllRestaurants);
router.post("/", validateRestaurant, checkDuplicate, createRestaurant);
router.get("/:id", getRestaurant);
router.put("/:id", validateRestaurant, checkDuplicateOnEdit, editRestaurant);
router.delete("/:id", deleteRestaurant);

export default router;
