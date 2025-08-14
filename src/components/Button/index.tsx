import styles from "./Button.module.css";
import clsx from "classnames";
import { forwardRef, ForwardedRef } from "react";

type ButtonVariant = "outlined" | "text";

type ButtonRounded = "full" | "sm";

type ButtonColor = "primary" | "success" | "warning" | "error";
interface IButtonProps {
  label: string;
  disabled?: boolean;
  startIcon?: React.ReactNode;
  color?: ButtonColor;
  rounded?: ButtonRounded;
  variant?: ButtonVariant;
  fullWidth?: boolean;
  handleClick: () => void;
}

const buttonStyles = {
  outlined: styles.outlined,
  text: styles.text,
};

const roundedStyles = {
  full: styles.full,
  sm: styles.sm,
};

const colorStyles = {
  primary: styles.primary,
  success: styles.success,
  warning: styles.warning,
  error: styles.error,
};

const Button = forwardRef(
  (
    {
      label,
      rounded = "sm",
      color = "primary",
      variant = "outlined",
      fullWidth = false,
      disabled = false,
      startIcon,
      handleClick,
    }: IButtonProps,
    ref: ForwardedRef<HTMLButtonElement>
  ): React.JSX.Element => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={clsx(
          styles.container,
          colorStyles[color],
          buttonStyles[variant],
          roundedStyles[rounded],
          {
            [styles.fullWidth]: fullWidth,
          }
        )}
        onClick={handleClick}
      >
        {startIcon && startIcon}
        {label}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
