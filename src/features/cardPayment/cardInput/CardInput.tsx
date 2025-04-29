import { useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { formatCardNumber } from "../../../shared/lib/formatters";

import s from "../CardInput.module.css";

type Props = {
  register: UseFormRegisterReturn;
  error?: string;
  disabled?: boolean;
};

export const CardInput = ({ register, error, disabled }: Props) => {
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, "");
    const formatted = formatCardNumber(input);
    setValue(formatted);

    e.target.value = formatted;
    register.onChange(e);
  };

  return (
    <div className={s.inputContainer}>
      <input
        {...register}
        className={`${s.input} ${error ? s.inputError : ""}`}
        placeholder="1234 5678 9012 3456"
        value={value}
        onChange={handleChange}
        disabled={disabled}
      />
      {error && <p className={s.error}>{error}</p>}
    </div>
  );
};
