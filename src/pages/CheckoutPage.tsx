import { MouseEvent, ReactNode, useState } from "react";

import { PaymentForm } from "../widgets/paymentForm/PaymentForm";
import { OrderSummary, PaymentSuccess } from "../features/cardPayment";
import { BackIcon } from "../shared/ui/icons";

import s from "./CheckoutPage.module.css";

interface Props {
  lang: string;
  currentLang: string;
  onClick: (lang: string, e: MouseEvent<HTMLAnchorElement>) => void;
  children: ReactNode;
}

const LangLink = ({ lang, currentLang, onClick, children }: Props) => (
  <a
    href="#"
    className={`${s.langLink} ${currentLang === lang ? s.active : ""}`}
    onClick={(e) => onClick(lang, e)}
  >
    {children}
  </a>
);

export const CheckoutPage = () => {
  const [isPaymentComplete, setIsPaymentComplete] = useState(false);
  const [language, setLanguage] = useState("en");

  const handlePaymentSuccess = () => {
    setIsPaymentComplete(true);
  };

  const toggleLanguage = (lang: string, e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setLanguage(lang);
  };

  return (
    <div className={s.checkoutContainer}>
      {!isPaymentComplete ? (
        <>
          <div className={s.header}>
            <div className={s.linkWrapper}>
              <LangLink
                lang="en"
                currentLang={language}
                onClick={toggleLanguage}
              >
                Eng
              </LangLink>
              <LangLink
                lang="uk"
                currentLang={language}
                onClick={toggleLanguage}
              >
                Укр
              </LangLink>
            </div>
          </div>
          <div className={s.content}>
            <div className={s.wrapperBack}>
              <button className={s.backButton}>
                <BackIcon />
              </button>
            </div>
            <div className={s.formSection}>
              <p className={s.checkout}> Checkout</p>
              <h1 className={s.title}>5 days free</h1>
              <p className={s.subtitle}>then 299.99 UAH per 14 days</p>
              <PaymentForm onPaymentSuccess={handlePaymentSuccess} />
              <div className={s.disclaimer}>
                You'll have your{" "}
                <span className={s.disclaimerStrong}>
                  Plan Pro during 1 year.
                </span>{" "}
                After this period of time,
                <p>
                  your plan will be{" "}
                  <span className={s.disclaimerStrong}>
                    automatically renewed
                  </span>{" "}
                  with its original price
                </p>
                <p>without any discounts applied.</p>
              </div>
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
