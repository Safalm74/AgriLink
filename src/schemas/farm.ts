import Joi from "joi";

//Schema to create farm
export const createFarmBodySchema = Joi.object({
  farmName: Joi.string().required().messages({
    "any.required": "Farm name is required",
  }),

  farmAddress: Joi.string().required().messages({
    "any.required": "Farm address is required",
  }),

  userId: Joi.string().required().uuid().messages({
    "any.required": "User Id is required",
  }),
});

//Schema to get farm
export const getFarmQuerySchema = Joi.object({
  id: Joi.string().uuid().optional(),

  page: Joi.number().optional().messages({
    "number.base": "page must be a number",
    "page.base": "page must be greater than zero",
  }),

  size: Joi.number()
    .min(1)
    .max(10)
    .optional()
    .messages({
      "number.base": "size must be a number",
    })
    .default(5),
}).options({
  stripUnknown: true,
});

//Schema to update farm query
export const updateFarmQuerySchema = Joi.object({
  id: Joi.string().uuid().required().messages({
    "any.required": "Id is required",
  }),
}).options({
  stripUnknown: true,
});

//Schema to update farm
export const updateFarmBodySchema = Joi.object({
  farmName: Joi.string().required().messages({
    "any.required": "Farm name is required",
  }),

  farmAddress: Joi.string().required().messages({
    "any.required": "Farm address is required",
  }),

  userId: Joi.string().required().uuid().messages({
    "any.required": "User Id is required",
  }),
}).options({
  stripUnknown: true,
});

//Schema to delete farm
export const deleteFarmQuerySchema = Joi.object({
  id: Joi.string().uuid().required().messages({
    "any.required": "farm Id is required",
  }),
}).options({
  stripUnknown: true,
});
