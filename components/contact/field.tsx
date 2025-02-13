"use client";

import { cn } from "@/lib/utils";
import { useId } from "react";
import styles from "./visitors.module.css";

interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Field = ({
  value,
  label,
  onChange,
  name,
  placeholder,
  error,
  ...props
}: FieldProps) => {
  const id = useId();

  return (
    <div className="flex flex-col gap-y-1">
      <label className="font-medium text-[14px]" htmlFor={id}>
        {label}
      </label>
      <input
        type="text"
        name={name}
        id={id}
        placeholder={placeholder}
        required
        autoComplete="off"
        autoCorrect="off"
        className={cn(
          "bg-[#101B1D]/30 focus:bg-gray-1 transition-all focus:placeholder:text-gray-9 text-[16px] outline-hidden text-gray-2 focus:text-gray-12 font-normal rounded-[6px] p-3 w-full placeholder:text-[white]/40 ",
          styles.input,
          error && "ring-2 ring-red-500"
        )}
        onChange={onChange}
        value={value}
        {...props}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};

export default Field;
