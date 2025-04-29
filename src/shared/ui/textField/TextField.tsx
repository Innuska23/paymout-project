import { InputHTMLAttributes } from "react";

import s from "./TextField.module.css";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const TextField = ({ label, error, ...props }: Props) => {
  return (
    <div className={s.container}>
      {label && <label className={s.label}>{label}</label>}
      <input className={`${s.input} ${error ? s.inputError : ""}`} {...props} />
      {error && <p className={s.error}>{error}</p>}
    </div>
  );
};
