import Joi from "joi";

//Schema to get id from params
export const productParamSchema = Joi.object({
  id: Joi.string().uuid().required().messages({
    "any.required": "Id is required",
  }),
});

//Schema to create product
export const createProductBodySchema = Joi.object({
  farmId: Joi.string().required().uuid().messages({
    "any.required": "Farm Id is required",
  }),

  productName: Joi.string().required().messages({
    "any.required": "Product name is required",
  }),

  price: Joi.number().min(1).required().messages({
    "any.required": "Price is required",
    "number.base": "Price must be at least a number",
  }),

  quantity: Joi.number().min(1).required().messages({
    "any.required": "Quantity is required",
    "number.base": "Quantity must be at least a number",
  }),

  quantityUnit: Joi.string().required().messages({
    "any.required": "Unit is required",
  }),

  description: Joi.string().required().messages({
    "any.required": "Description is required",
  }),

  imageUrl: Joi.string().required().messages({
    "any.required": "Image url is required",
  }),

  category: Joi.string().required().messages({
    "any.required": "Category is required",
  }),
}).options({
  stripUnknown: true,
});

//Schema to get product
export const getProductQuerySchema = Joi.object({
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
  searchKeyword: Joi.string().optional(),
}).options({
  stripUnknown: true,
});

//Schema to update product
export const updateProductBodySchema = Joi.object({
  productName: Joi.string().optional().messages({
    "any.required": "Product name is required",
  }),

  price: Joi.number().min(1).optional().messages({
    "any.required": "Price is required",
    "number.base": "Price must be at least a number",
  }),

  quantity: Joi.number().min(1).optional().messages({
    "any.required": "Quantity is required",
    "number.base": "Quantity must be at least a number",
  }),

  quantityUnit: Joi.string().optional().messages({
    "any.required": "Unit is required",
  }),

  description: Joi.string().optional().messages({
    "any.required": "Description is required",
  }),

  imageUrl: Joi.string().optional().messages({
    "any.required": "Image url is required",
  }),

  category: Joi.string().optional().messages({
    "any.required": "Category is required",
  }),
}).options({
  stripUnknown: true,
});
