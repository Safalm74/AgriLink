import Joi from "joi";

//Schema for cartParam
export const cartParamSchema = Joi.object({
  id: Joi.string().uuid().required().messages({
    "any.required": "Id is required",
  }),
}).options({
  stripUnknown: true,
});

//Schema to create cartItems
export const createCartBodySchema = Joi.object({
  productId: Joi.string().uuid().required().messages({
    "any.required": "Product Id is required",
  }),

  quantity: Joi.number().min(1).required().messages({
    "any.required": "Quantity is required",
    "number.base": "Quantity must be at least a number",
  }),
}).options({
  stripUnknown: true,
});

//Schema to get cartItems
export const getCartQuerySchema = Joi.object({
  id: Joi.string().uuid().optional(),

  page: Joi.number().optional().messages({
    "number.base": "page must be a number",
    "page.base": "page must be greater than zero and smaller than 10",
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

//Schema to create cartItems
export const updateCartBodySchema = Joi.object({
  quantity: Joi.number().min(1).optional().messages({
    "any.required": "Quantity is required",
    "number.base": "Quantity must be at least a number",
  }),
}).options({
  stripUnknown: true,
});
