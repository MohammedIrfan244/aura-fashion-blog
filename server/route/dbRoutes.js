import express from "express";
import tryCatch from "../utilities/tryCatch.js";
import idValidation from "../middlewares/idValidation.js";
import { addNewStyleCategory,removeStyleCategory } from "../controller/dbController/styleCategoryHandler.js";


const router = express.Router();

router
.post("/add-new-style-category", tryCatch(addNewStyleCategory))
.delete("/remove-style-category/:id",idValidation,tryCatch(removeStyleCategory))

export default router;
