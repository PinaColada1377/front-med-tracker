import { InputProps } from "./Input.props";
import styles from "./Input.module.css";
import cn from "classnames";
import { ForwardedRef, forwardRef } from "react";

export const Input = forwardRef(
  (
    { name, className, errorMessage, ...props }: InputProps,
    ref: ForwardedRef<HTMLInputElement>
  ): JSX.Element => {
    return (
      <div className={cn(className, styles.inputWrapper)}>
        <label>
          <span className={styles.label}>{name}</span>
          <input
            className={cn(styles.input, {
              [styles.error]: errorMessage,
            })}
            ref={ref}
            {...props}
          />
        </label>
        {errorMessage && (
          <span role="alert" className={styles.errorMessage}>
            {errorMessage}
          </span>
        )}
      </div>
    );
  }
);
