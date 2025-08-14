import styles from "./Input.module.css";
import { InputHTMLAttributes, forwardRef } from "react";
import clsx from "classnames";

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = forwardRef<HTMLInputElement, IInputProps>(
  ({ type = "text", value, onChange, className, ...rest }, ref) => {
    return (
      <input
        className={clsx(styles.input, className)}
        type={type}
        value={value}
        onChange={onChange}
        ref={ref}
        {...rest}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
