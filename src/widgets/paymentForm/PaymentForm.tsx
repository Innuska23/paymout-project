import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { CardInput } from "../../features/cardPayment/cardInput/CardInput";
import { simulatePayment } from "../../shared/api/payment";
import { ExpirationInput } from "../../features/cardPayment/expirationInput/ExpirationInput";
import { CvvInput } from "../../features/cardPayment/cvvInput/CvvInput";
import { Button } from "../../shared/ui/button/Button";
import { ApplePayIcon } from "../../shared/ui/icons";
import { formSchema } from "../../shared/utils/formSchema";

import s from "./PaymentForm.module.css";

type FormValues = z.infer<typeof formSchema>;

type Props = {
  onPaymentSuccess: () => void;
};

export const PaymentForm = ({ onPaymentSuccess }: Props) => {
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
          <ApplePayIcon />
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
          <label className={s.label}>CVC</label>
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
