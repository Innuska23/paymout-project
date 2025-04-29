import { useState, useEffect, ButtonHTMLAttributes, ReactNode } from "react";

import s from "./Button.module.css";

interface Type extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  fullWidth?: boolean;
  isLoading?: boolean;
  color?: "green" | "black" | "white";
  loadingText?: string;
  showSpinner?: boolean;
}

export const Button = ({
  children,
  fullWidth = false,
  isLoading = false,
  color = "green",
  disabled,
  loadingText = "Processing payment",
  showSpinner = true,
  className = "",
  ...props
}: Type) => {
  const [showProcessingText, setShowProcessingText] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (isLoading) {
      timeout = setTimeout(() => {
        setShowProcessingText(true);
      }, 1000);
    } else {
      setShowProcessingText(false);
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [isLoading]);

  const buttonClassNames = `
    ${s.button}
    ${fullWidth ? s.fullWidth : ""}
    ${s[color] || ""}
    ${isLoading ? s.processing : ""}
    ${className}
  `
    .trim()
    .replace(/\s+/g, " ");

  return (
    <button
      className={buttonClassNames}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <div className={s.processingContainer}>
          {showProcessingText ? (
            <>
              {showSpinner && <div className={s.spinner} aria-hidden="true" />}
              <span className={s.processingText}>{loadingText}</span>
            </>
          ) : (
            showSpinner && <div className={s.spinner} aria-hidden="true" />
          )}
        </div>
      ) : (
        children
      )}
    </button>
  );
};
