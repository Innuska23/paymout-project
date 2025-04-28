import { useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import s from "../CardInput.module.css";

interface CvvInputProps {
  register: UseFormRegisterReturn;
  error?: string;
  disabled?: boolean;
}

export const CvvInput = ({ register, error, disabled }: CvvInputProps) => {
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, "");

    if (input.length <= 4) {
      setValue(input);

      e.target.value = input;
      register.onChange(e);
    }
  };

  return (
    <div className={s.inputContainer}>
      <input
        {...register}
        className={`${s.input} ${error ? s.inputError : ""}`}
        placeholder="123"
        type="password"
        value={value}
        onChange={handleChange}
        disabled={disabled}
      />
      {error && <p className={s.error}>{error}</p>}
    </div>
  );
};
