import Joi from "joi";

export const joiUserSchema = Joi.object({
  email: Joi.string().email().required(),
  username: Joi.string().min(3).max(10).required(),
  password: Joi.string().min(6).max(20).required(),
  otp: Joi.string().min(6).max(6).required(),
});
