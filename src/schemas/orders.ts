import Joi from "joi";

//Schema to get id from params
export const orderParamSchema = Joi.object({
  id: Joi.string().uuid().required().messages({
    "any.required": "Id is required",
  }),
});

const orderItems = Joi.object({
  productId: Joi.string().required().uuid().messages({
    "any.required": "Product id is required",
  }),
  unitPrice: Joi.number().min(1).required().messages({
    "any.required": "Unit price is required",
    "number.base": "Unit price must be at least a number",
  }),
  quantity: Joi.number().min(1).required().messages({
    "any.required": "Quantity is required",
    "number.base": "Quantity must be at least a number",
  }),
});

//Schema to create order
export const createOrderBodySchema = Joi.object({
  farmId: Joi.string().required().uuid().messages({
    "any.required": "Farm Id is required",
  }),

  customerId: Joi.string().required().messages({
    "any.required": "Customer id is required",
  }),
  orderItems: Joi.array().items(orderItems).required().messages({
    "any.required": "Order items is required",
  }),
}).options({
  stripUnknown: true,
});

//Schema to get order
export const getOrderQuerySchema = Joi.object({
  id: Joi.string().uuid().optional(),

  farmId: Joi.string().uuid().optional(),

  page: Joi.number()
    .optional()
    .messages({
      "number.base": "page must be a number",
      "page.base": "page must be greater than zero",
    })
    .default(1),

  size: Joi.number()
    .min(1)
    .max(10)
    .optional()
    .messages({
      "number.base": "size must be a number",
    })
    .default(18),
}).options({
  stripUnknown: true,
});

//Schema to update order
export const updateOrderBodySchema = Joi.object({
  orderStatus: Joi.string().required().messages({
    "any.required": "order Status is required",
  }),
}).options({
  stripUnknown: true,
});
