import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface DescProps {
  children: ReactNode;
  className?: string;
}

const Description = ({ children, className }: DescProps) => {
  return (
    <p className={cn("leading-7 [&:not(:first-child)]:mt-4", className)}>
      {children}
    </p>
  );
};

export default Description;
