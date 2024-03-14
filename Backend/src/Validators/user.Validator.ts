import Joi from "joi";

export const updateSchema = Joi.object({
    gender: Joi.string().required(),
    DOB: Joi.string(),
    about: Joi.string(),
    country: Joi.string(),
    city: Joi.string(),
    phoneNumber: Joi.string(),
    bankAcNo: Joi.number(),
    bankAcName: Joi.string()
});