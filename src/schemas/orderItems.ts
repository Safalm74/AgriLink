import Joi from "joi";

//Schema to get id from query
export const orderItemsQuerySchema = Joi.object({
  id: Joi.string().uuid().optional().messages({
    "any.required": "Id is required",
  }),
  orderId: Joi.string().uuid().optional().messages({
    "any.required": "orderId is required",
  }),
  page: Joi.string().uuid().optional().messages({
    "any.required": "Page is required",
  }),
  size: Joi.string().uuid().optional().messages({
    "any.required": "Size is required",
  }),
});
