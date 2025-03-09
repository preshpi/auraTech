"use client";
import { Eye, EyeOff } from "lucide-react";
import { InputProps } from "../../types/ui/input.type";
import { useState, forwardRef } from "react";

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      value,
      name,
      id,
      type,
      additionalClasses,
      placeholder,
      onChange,
      additionalAttributes,
      textarea,
      password,
      pattern,
      rows,
      readOnly,
      cols,
      disabled,
      required,
      minLength,
      maxLength,
      autoComplete,
    },
    ref
  ) => {
    const [visible, setVisible] = useState<boolean>(false);

    return (
      <div className="flex w-full flex-col gap-y-1">
        <label className="text-left font-light capitalize text-black text-[14px]">
          {label} {label && <span className="text-red-500">*</span>}
        </label>
        {!textarea && (
          <div className="relative">
            <input
              name={name}
              id={id}
              value={value}
              ref={ref}
              className={`${
                additionalClasses
                  ? additionalClasses +
                    "w-full text-base bg-transparent rounded-md border border-gray-200 px-4 py-3 focus:ring-1 ring-primary-50 outline-none"
                  : "w-full rounded-[16px] bg-[#2E2E2E]  px-4 py-3 text-base font-light focus:ring-1 ring-primary-50 outline-none"
              }`}
              type={!visible ? type : "text"}
              required={required}
              readOnly={readOnly}
              minLength={minLength}
              maxLength={maxLength}
              autoComplete={autoComplete}
              pattern={pattern}
              placeholder={placeholder}
              disabled={disabled}
              onChange={onChange}
              {...additionalAttributes}
            />
            {password && (
              <i className="absolute right-4 top-1/2 flex -translate-y-1/2 items-center text-accent-50">
                <button
                  type="button"
                  onClick={() => setVisible(!visible)}
                  aria-label={visible ? "Hide password" : "Show password"}
                >
                  <span className="sr-only">
                    {visible ? "Hide password" : "Show password"}
                  </span>
                  {visible ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </i>
            )}
          </div>
        )}
        {textarea && (
          <textarea
            className="w-full outline-none focus:ring-1 ring-black rounded-md border border-gray-200 bg-transparent px-4 py-4 text-[14px] font-light"
            rows={rows}
            cols={cols}
            disabled={disabled}
            placeholder={placeholder}
            maxLength={maxLength}
            onChange={onChange}
          ></textarea>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
