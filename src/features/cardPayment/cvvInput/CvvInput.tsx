import { useState } from "react";
import s from "../CardInput.module.css";
import { InfoIcon } from "../../../shared/ui/icons";
import { UseFormRegisterReturn } from "react-hook-form";

interface CvvInputProps {
  register: UseFormRegisterReturn;
  error?: string;
  disabled?: boolean;
}

export const CvvInput = ({ register, error, disabled }: CvvInputProps) => {
  const [value, setValue] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, "");

    if (input.length <= 3) {
      setValue(input);
      e.target.value = input;
      register.onChange(e);
    }
  };

  return (
    <div className={s.inputContainer}>
      <input
        type="text"
        placeholder="..."
        maxLength={3}
        name={register.name}
        ref={register.ref}
        onBlur={register.onBlur}
        onChange={handleChange}
        value={value}
        disabled={disabled}
        className={`${s.input} ${error ? s.error : ""}`}
      />
      <div className={s.iconWrapper}>
        <InfoIcon
          className={s.infoIcon}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          onClick={(e: React.MouseEvent) => {
            e.preventDefault();
            setShowTooltip(!showTooltip);
          }}
        />
        {showTooltip && (
          <div className={s.tooltip}>
            The CVC is a 3 or 4 digit security code, usually found on the back
            of your card.
          </div>
        )}
      </div>
      {error && <div className={s.errorMessage}>{error}</div>}
    </div>
  );
};
