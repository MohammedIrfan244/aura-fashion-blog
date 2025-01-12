import  express from "express";
import tryCatch from "../utilities/tryCatch.js";
import { getAllBoutiqueCategories,getAllStyleCategories ,getAllBoutiqueBanners} from "../controller/publicController.js";

const router = express.Router();

router
.get("/all-boutique-categories",tryCatch(getAllBoutiqueCategories))
.get("/all-style-categories",tryCatch(getAllStyleCategories))
.get("/all-boutique-banners",tryCatch(getAllBoutiqueBanners))

export default router;