import * as React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const MyInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={`w-full py-2 pl-3 text-sm border rounded-md focus:border-black focus:outline-none ${className}`}
        ref={ref}
        {...props}
      />
    )
  }
)

export { MyInput }