import Joi from "joi";

export const industrySchema = Joi.object({
    industryName: Joi.string().required()
})