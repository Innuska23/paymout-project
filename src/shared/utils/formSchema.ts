import { z } from "zod";

export const formSchema = z.object({
  cardNumber: z
    .string()
    .min(1, "Card number is required")
    .refine((val) => {
      const digits = val.replace(/\s/g, "");
      return /^\d{16}$/.test(digits);
    }, "Card number must be 16 digits"),
  expiration: z
    .string()
    .min(1, "Expiration date is required")
    .refine((val) => {
      return /^\d{2}\/\d{2}$/.test(val);
    }, "Invalid expiration date format (MM/YY)")
    .refine((val) => {
      const [month, year] = val.split("/");
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear() % 100;
      const currentMonth = currentDate.getMonth() + 1;
      const expMonth = parseInt(month, 10);
      const expYear = parseInt(year, 10);

      if (
        expYear < currentYear ||
        (expYear === currentYear && expMonth < currentMonth)
      ) {
        return false;
      }
      return true;
    }, "Card is expired"),
  cvv: z
    .string()
    .min(1, "CVV is required")
    .refine((val) => {
      return /^\d{3,4}$/.test(val);
    }, "CVV must be 3 or 4 digits"),
});
