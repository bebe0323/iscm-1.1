import * as React from "react"

const MyButton = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <button
        className={
          `bg-black text-white w-full border rounded-md py-2 hover:bg-stone-700 ${className}`
        }
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  }
)
MyButton.displayName = "Button"

export { MyButton }
