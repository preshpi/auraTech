import { ButtonProps } from "../../../types/ui/button.type";

export function Button({
  children,
  className,
  onClick,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        if (onClick) onClick(e);
      }}
      disabled={disabled}
      {...props}
      type="submit"
      className={`${className} rounded-md font-medium text-center disabled:hover:bg-opacity-100 hover:bg-opacity-85 transition-all duration-300 text-[16px] w-full py-3 px-4`}
    >
      {children}
    </button>
  );
}
