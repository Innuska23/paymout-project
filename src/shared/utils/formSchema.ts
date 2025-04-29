import { z } from "zod";

export const formSchema = z.object({
  cardNumber: z
    .string()
    .min(16, "Please enter a valid card number")
    .max(19, "Please enter a valid card number")
    .refine(
      (val) => /^[0-9\s-]+$/.test(val),
      "Card number can only contain digits"
    ),
  expiration: z
    .string()
    .min(5, "Please enter a valid expiration date")
    .max(5, "Please enter a valid expiration date")
    .refine(
      (val) => /^(0[1-9]|1[0-2])\/\d{2}$/.test(val),
      "Format should be MM/YY"
    ),
  cvv: z
    .string()
    .min(3, "Please enter a valid CVV")
    .max(4, "Please enter a valid CVV")
    .refine((val) => /^\d+$/.test(val), "CVV can only contain digits"),
});

