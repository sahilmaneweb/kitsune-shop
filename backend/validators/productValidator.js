import { z } from "zod";

export const productValidator = z.object({
  name: z
    .string({ required_error: "Product name is required" })
    .min(1, "Product name cannot be empty"),

  category: z
    .enum(["kitsune-tees", "kitsune-headgear", "kitsune-shirt"], {
      required_error: "Category is required",
      invalid_type_error: "Invalid category selected"
    }),

  offerPrice: z
    .string({ required_error: "Offer price is required" })
    .min(1, "Offer price must be a positive number"),

  price: z
    .string({ required_error: "Price is required" })
    .min(1, "Price must be a positive number"),

  description: z
    .string({ required_error: "Description is required" })
    .min(1, "Description cannot be empty"),
});
