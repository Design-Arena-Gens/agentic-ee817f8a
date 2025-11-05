import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

interface CardProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
  highlight?: boolean;
}

export const Card = ({ className, highlight, children, ...props }: CardProps) => (
  <div
    className={cn(
      "glass relative overflow-hidden rounded-3xl border border-white/5 p-6 shadow-[0_25px_45px_rgba(8,24,55,0.35)] transition hover:border-cyan-400/30 hover:shadow-[0_30px_70px_rgba(8,24,55,0.55)]",
      highlight &&
        "border-cyan-400/40 shadow-[0_30px_70px_rgba(0,188,212,0.35)] before:absolute before:inset-0 before:-z-10 before:bg-cyan-400/10",
      className,
    )}
    {...props}
  >
    {children}
  </div>
);
