import joi from "joi";

export const registerSchema = joi.object({
    fullName: joi.string().required(),
    email: joi.string().required().email(),
    password: joi.string().required(),
})