import { useState } from "react";

import { PaymentForm } from "../widgets/paymentForm/PaymentForm";
import { OrderSummary, PaymentSuccess } from "../features/cardPayment";

import s from "./CheckoutPage.module.css";

export const CheckoutPage = () => {
  const [isPaymentComplete, setIsPaymentComplete] = useState(false);
  const [language, setLanguage] = useState("en");

  const handlePaymentSuccess = () => {
    setIsPaymentComplete(true);
  };

  const toggleLanguage = (lang, e) => {
    e.preventDefault();
    setLanguage(lang);
  };
  return (
    <div className={s.checkoutContainer}>
      {!isPaymentComplete ? (
        <>
          <div className={s.header}>
            <div className={s.languageSelector}>
              <a
                href="#"
                className={`${s.langLink} ${language === "en" ? s.active : ""}`}
                onClick={(e) => toggleLanguage("en", e)}
              >
                Eng
              </a>
              <a
                href="#"
                className={`${s.langLink} ${
                  language === "ukr" ? s.active : ""
                }`}
                onClick={(e) => toggleLanguage("ukr", e)}
              >
                Укр
              </a>
            </div>
          </div>
          <div className={s.content}>
            <div className={s.formSection}>
              <button className={s.backButton}>Checkout</button>
              <h1 className={s.title}>5 days free</h1>
              <p className={s.subtitle}>Then 29.99 USD per 30 days</p>
              <PaymentForm onPaymentSuccess={handlePaymentSuccess} />
              <p className={s.disclaimer}>
                You'll have your{" "}
                <span className={s.disclaimerStrong}>
                  Plan Pro during 1 year.
                </span>{" "}
                After this period of time, your plan will be
                <span className={s.disclaimerStrong}>
                  automatically renewed
                </span>{" "}
                with its original price without any discounts applied.
              </p>
            </div>
            <div className={s.summarySection}>
              <OrderSummary />
            </div>
          </div>
        </>
      ) : (
        <PaymentSuccess />
      )}
      <div className={s.footer}>
        <p>
          Powered by <span className={s.solid}>Solid</span>
        </p>
      </div>
    </div>
  );
};