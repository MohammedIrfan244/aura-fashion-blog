import express from "express";
import tryCatch from "../utilities/tryCatch.js";
import {
  getAllBoutiqueCategories,
  getAllStyleCategories,
  getAllBoutiqueBadges,
} from "../controller/publicController.js";

const router = express.Router();

router
  .get("/all-boutique-categories", tryCatch(getAllBoutiqueCategories))
  .get("/all-style-categories", tryCatch(getAllStyleCategories))
  .get("/all-boutique-badges", tryCatch(getAllBoutiqueBadges));

export default router;
