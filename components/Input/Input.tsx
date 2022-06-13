import { InputProps } from './Input.props';
import styles from './Input.module.css';
import cn from 'classnames';
import { ForwardedRef, forwardRef } from 'react';

export const Input = forwardRef(({ name, className, error, ...props }: InputProps, ref: ForwardedRef<HTMLInputElement>): JSX.Element => {
	return (
		<div className={cn(className, styles.inputWrapper)}>
			<label>
            <span style={{ marginBottom: "0.9rem", color: "gray" }}>{name}</span>
			<input className={cn(styles.input, {
				[styles.error]: error
			})} ref={ref} {...props} />
			</label>
			{error && <span role="alert" className={styles.errorMessage}>{error.message}</span>}
			{/* <span role="alert" className={styles.errorMessage}>Asdasdasdasd</span> */}
		</div>
	);
});


    