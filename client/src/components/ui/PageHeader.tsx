
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  className?: string;
  centered?: boolean;
}

export const PageHeader = ({ 
  title, 
  subtitle, 
  children, 
  className,
  centered = true 
}: PageHeaderProps) => {
  return (
    <motion.div 
      className={cn(
        "mb-16",
        centered && "text-center",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl md:text-5xl font-bold mb-6">
        {title}
      </h1>
      {subtitle && (
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
          {subtitle}
        </p>
      )}
      {children}
    </motion.div>
  );
};

export default PageHeader;
