import s from './PaymentSuccess.module.css';

export const PaymentSuccess = () => {
  return (
    <div className={s.container}>
      <div className={s.successIcon}>✓</div>
      <h1 className={s.title}>Payment Successful!</h1>
      <p className={s.message}>
        Thank you for your order. Your payment has been processed successfully.
        You can now enjoy your 5-day free trial.
      </p>
      <p className={s.details}>
        A confirmation email with all the details has been sent to your email address.
      </p>
      <a href="/" className={s.button}>
        Return to Homepage
      </a>
    </div>
  );
};