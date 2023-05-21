import { IconName } from "@fortawesome/fontawesome-svg-core";
import { useEffect } from "react";

export default function TextInput({
  id,
  type = "text",
  name,
  value,
  className,
  autoComplete,
  required,
  disabled,
  isFocused,
  label,
  handleChange,
  handleSuggectClick,
  onPointerLeave,
  showPasswd,
  errors,
  placeholder,
  rightIcon,
  leftIcon,
  isPassword,
  isSearch,
  addon,
  suggest,
  suggestions,
  ...props
}: {
  id?: string;
  type: string;
  name: string;
  value: any;
  className?: string;
  autoComplete?: string;
  required?: boolean;
  disabled?: boolean;
  isFocused?: boolean;
  label?: string;
  handleChange: (e: any) => void;
  handleSuggectClick?: (e: any) => void;
  onPointerLeave?: (e: any) => void;
  showPasswd?: (e: boolean) => void;
  // showPassword?: boolean;
  placeholder?: string;
  rightIcon?: IconName;
  leftIcon?: IconName;
  errors?: any;
  isPassword?: boolean;
  isSearch?: boolean;
  addon?: String;
  suggest?: boolean;
  suggestions?: [];
}) {
  useEffect(() => {
    window.addEventListener("click", function (e) {
      // @ts-ignore
      let el = document.getElementById(id);
      if (el && e !== null) {
        // @ts-ignore
        if (!el.contains(e.target)) {
        }
      }
    });
  }, []);

  const handleInputChange = (e: any) => {
    handleChange(e);
  };

  return (
    <div id={id} className={`flex flex-col items-start ${className}`}>
      {label && (
        <label className="label" htmlFor={id}>
          {label}
        </label>
      )}
      <div className="relative w-full">
        <input
          type={type}
          name={name}
          value={value}
          className={`
                       border-gray-200 py-2 bg-gray-200 rounded-md shadow-sm border border-solid border-gray px-3 w-full outline-none focus:highlight-bd`}
          autoComplete={autoComplete}
          required={required}
          onChange={(e) => handleInputChange(e)}
          placeholder={placeholder}
          disabled={disabled}
          {...props}
        />
      </div>
    </div>
  );
}
