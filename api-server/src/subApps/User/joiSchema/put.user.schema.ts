import * as Joi from "joi";

export const putUserSchema = {
    firstName: Joi.string().min(1).required(),
    lastName: Joi.string().min(1).required(),
    email: Joi.string().email(),
    phone1: Joi.string().length(9).required(),
    addressLine1: Joi.string(),
    addressLine2: Joi.string(),
    addressLine3: Joi.string(),
    addressLine4: Joi.string(),
    addressLine5: Joi.string()
}

