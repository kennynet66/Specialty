import joi from "joi";

export const registerSchema = joi.object({
    fullName: joi.string().required(),
    email: joi.string().required().email(),
    password: joi.string().required(),
    rate: joi.number().required(),
    industry: joi.string().required(),
    isSpecialist: joi.number()
})