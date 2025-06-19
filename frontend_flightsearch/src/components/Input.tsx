import type { ChangeEvent, FC } from "react";
interface InputProps {
  label: string;
  value?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type: string;
}

const Input: FC<InputProps> = ({
  label,
  placeholder,
  type,
  value,
  onChange,
  onFocus,
}) => {
  return (
    <div className="w-full max-w-xs rounded-lg font-mono">
      <label
        className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
        htmlFor={`unique-input-${label}`}
      >
        {label}
      </label>
      <input
        className="text-sm custom-input w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100 dark:bg-gray-800 dark:text-white"
        placeholder={placeholder}
        onChange={onChange}
        onFocus={onFocus}
        type={type}
        id={`unique-input-${label}`}
        value={value ?? ""}
      />
    </div>
  );
};

export default Input;
