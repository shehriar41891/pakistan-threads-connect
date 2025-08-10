import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-card hover:shadow-elegant",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-card",
        outline:
          "border border-border bg-card text-card-foreground hover:bg-accent hover:text-accent-foreground shadow-card",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-card",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        hero: "gradient-hero text-primary-foreground hover:shadow-glow font-semibold tracking-wide",
        success: "bg-success text-success-foreground hover:bg-success/90 shadow-card",
        warning: "bg-warning text-warning-foreground hover:bg-warning/90 shadow-card",
        premium: "gradient-primary text-primary-foreground hover:shadow-glow border border-primary-glow/20",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 rounded-md px-4 text-xs",
        lg: "h-13 rounded-lg px-10 text-base",
        xl: "h-16 rounded-xl px-12 text-lg font-semibold",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
