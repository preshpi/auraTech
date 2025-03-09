import { NumericFormat, NumericFormatProps } from "react-number-format";

interface MyNumberFormatProps extends NumericFormatProps {
  prefix?: string;
  suffix?: string;
  decimalScale?: number;
  onlyNaira?: boolean;
}

const NumberFormat = ({
  value,
  decimalScale,
  displayType,
  className,
  onlyNaira,
  ...otherProps
}: MyNumberFormatProps) => {
  return (
    <NumericFormat
      value={value}
      displayType={displayType || "text"} // Default to 'text' if not provided
      thousandSeparator={true}
      decimalSeparator={"."}
      prefix={onlyNaira ? "₦" : "₦"}
      decimalScale={decimalScale || 2} // Default to 2 decimal places if not provided
      fixedDecimalScale
      className={className ?? ""}
      {...otherProps}
    />
  );
};

export default NumberFormat;
