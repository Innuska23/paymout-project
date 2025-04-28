import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CardInput } from "../../features/cardPayment/cardInput/CardInput";

import { simulatePayment } from "../../shared/api/payment";
import s from "./PaymentForm.module.css";
import { ExpirationInput } from "../../features/cardPayment/expirationInput/ExpirationInput";
import { CvvInput } from "../../features/cardPayment/cvvInput/CvvInput";
import { Button } from "../../shared/ui/button/Button";

const formSchema = z.object({
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

type FormValues = z.infer<typeof formSchema>;

interface PaymentFormProps {
  onPaymentSuccess: () => void;
}

export const PaymentForm = ({ onPaymentSuccess }: PaymentFormProps) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cardNumber: "",
      expiration: "",
      cvv: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsProcessing(true);
    try {
      await simulatePayment(data);
      onPaymentSuccess();
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
      <div className={s.paymentMethod}>
        <Button
          type="button"
          className={s.applePayButton}
          disabled={isProcessing}
          color="black"
        >
          <img src="../../shared/assets/apple.svg" alt="Apple Pay" />
        </Button>
        <div className={s.divider}>
          <span>or pay with card</span>
        </div>
      </div>

      <div className={s.field}>
        <label className={s.label}>Card Number</label>
        <CardInput
          register={register("cardNumber")}
          error={errors.cardNumber?.message}
          disabled={isProcessing}
        />
      </div>

      <div className={s.fieldRow}>
        <div className={s.field}>
          <label className={s.label}>Expiration Date</label>
          <ExpirationInput
            register={register("expiration")}
            error={errors.expiration?.message}
            disabled={isProcessing}
          />
        </div>
        <div className={s.field}>
          <label className={s.label}>CVV</label>
          <CvvInput
            register={register("cvv")}
            error={errors.cvv?.message}
            disabled={isProcessing}
          />
        </div>
      </div>

      <Button
        type="submit"
        fullWidth
        isLoading={isProcessing}
        disabled={isProcessing}
      >
        {isProcessing ? "Processing..." : "Pay 299.99 USD"}
      </Button>
    </form>
  );
};
