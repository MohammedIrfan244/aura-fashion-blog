import express from 'express'
import tryCatch from '../../utilities/tryCatch.js'
import { verifyToken } from '../../middlewares/verfiyToken.js'
import { getOneStyle, getStyleByCategory } from '../../controller/userControllers/styleController.js'
import idValidation from '../../middlewares/idValidation.js'

const route=express.Router()

route
.get("/style-by-category",tryCatch(getStyleByCategory))
.get("/style-by-id/:id",idValidation,tryCatch(getOneStyle))

export default route
