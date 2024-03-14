import Joi from "joi";

export const updateSchema = Joi.object({
    gender: Joi.string().required(),
    DOB: Joi.string().required(),
    about: Joi.string().required(),
    country: Joi.string().required(),
    industry: Joi.string().required(),
    city: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    bankAcNo: Joi.number().required(),
    bankAcName: Joi.string().required()
});