import express from "express";
import tryCatch from "../utilities/tryCatch.js";
import { addNewStyleCategory,removeStyleCategory } from "../controllers/dbController/styleCategoryHandler.js";


const router = express.Router();

router
.post("/add-new-style-category", tryCatch(addNewStyleCategory))
.delete("/remove-style-category/:id", tryCatch(removeStyleCategory))

export default router;
