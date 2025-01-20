import express from 'express'
import tryCatch from '../../utilities/tryCatch.js'
import { getOneStyle, getStyleByCategory, likeStyle } from '../../controller/userControllers/styleController.js'
import idValidation from '../../middlewares/idValidation.js'
import verifyToken from '../../middlewares/verfiyToken.js'

const route=express.Router()

route
.get("/style-by-category",verifyToken,tryCatch(getStyleByCategory))
.get("/style-by-id/:id",verifyToken,idValidation,tryCatch(getOneStyle))
.post("/style-like/:id",verifyToken,idValidation,tryCatch(likeStyle))

export default route
