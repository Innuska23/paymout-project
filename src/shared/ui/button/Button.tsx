import { useState, useEffect } from "react";
import s from "./Button.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  fullWidth?: boolean;
  isLoading?: boolean;
  color?: "green" | "black";
}

export const Button = ({
  children,
  fullWidth = false,
  isLoading = false,
  color = "green",
  disabled,
  ...props
}: ButtonProps) => {
  const [showProcessingText, setShowProcessingText] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
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

  const buttonClassNames = [
    s.button,
    fullWidth && s.fullWidth,
    s[color],
    isLoading && s.processing,
  ]
    .filter(Boolean)
    .join(" ");

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
              <div className={s.spinner}></div>
              <span className={s.processingText}>Processing payment</span>
            </>
          ) : (
            <div className={s.spinner}></div>
          )}
        </div>
      ) : (
        children
      )}
    </button>
  );
};
