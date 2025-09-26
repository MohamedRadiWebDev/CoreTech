
import { ReactNode, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: "default" | "outline" | "ghost";
  padding?: "sm" | "md" | "lg";
  hover?: boolean;
  focusable?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(({
  children,
  className,
  variant = "default",
  padding = "md",
  hover = false,
  focusable = false,
  ...props
}, ref) => {
  const variantClasses = {
    default: "bg-card border border-border shadow-sm",
    outline: "border-2 border-border bg-transparent",
    ghost: "bg-transparent"
  };

  const paddingClasses = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8"
  };

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-lg transition-all duration-200",
        variantClasses[variant],
        paddingClasses[padding],
        hover && "hover:shadow-lg hover:-translate-y-1",
        focusable && "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
        className
      )}
      tabIndex={focusable ? 0 : undefined}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = "Card";

export default Card;
