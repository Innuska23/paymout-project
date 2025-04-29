import s from "./PaymentSuccess.module.css";

const CheckmarkIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M27 9L13 23L6 16"
      stroke="white"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const PaymentSuccess = () => {
  return (
    <div className={s.container}>
      <div className={s.successIcon}>
        <CheckmarkIcon />
      </div>
      <h1 className={s.title}>Payment Successful!</h1>
      <p className={s.message}>
        Thank you for your order. Your payment has been processed successfully.
        You can now enjoy your 5-day free trial.
      </p>
      <p className={s.details}>
        A confirmation email with all the details has been sent to your email
        address.
      </p>
      <a href="/" className={s.button}>
        Return to Homepage
      </a>
    </div>
  );
};
