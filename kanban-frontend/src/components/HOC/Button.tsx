import { MouseEventHandler, memo } from 'react';

type ButtonProps = {
  buttonType: string;
  label: string | React.ReactElement;
  disabled?: boolean;
  submit?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export const Button = memo(
  ({
    buttonType,
    onClick,
    label,
    disabled = false,
    submit = false,
  }: ButtonProps) => {
    return (
      <button
        className={buttonType}
        onClick={onClick}
        disabled={disabled}
        type={submit ? 'submit' : 'button'}
      >
        {label}
      </button>
    );
  }
);

export const withBaseColor = (
  Component: React.ComponentType<ButtonProps>,
  baseColor: string
) => {
  return function (props: Omit<ButtonProps, 'buttonType'>) {
    return <Component buttonType={baseColor} {...props} />;
  };
};
