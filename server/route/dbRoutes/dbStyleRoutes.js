import { addNewStyleCategory } from "../../controllers/dbController/styleCategoryHandler";
import { removeStyleCategory } from "../../controllers/dbController/styleCategoryHandler";
import express from "express";
import tryCatch from "../../utilities/tryCatch";

const router = express.Router();

router
    .post("/add-new-style-category", tryCatch(addNewStyleCategory))
    .delete("/remove-style-category/:id", tryCatch(removeStyleCategory));

export default router;