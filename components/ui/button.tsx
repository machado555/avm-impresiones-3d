import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "danger";
type ButtonSize = "sm" | "md" | "lg";

type ButtonBase = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: boolean;
  full?: boolean;
};

type ButtonProps = ButtonBase & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  className,
  variant = "primary",
  size = "md",
  loading,
  icon,
  full,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "avm-btn",
        `avm-btn--${variant}`,
        icon && "avm-btn--icon",
        full && "avm-btn--full",
        size === "sm" && "avm-btn--sm",
        size === "lg" && "avm-btn--lg",
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <span className="avm-btn__spinner" />}
      {children}
    </button>
  );
}

type ButtonLinkProps = ButtonBase & AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
};

export function ButtonLink({
  href,
  className,
  variant = "primary",
  size = "md",
  loading,
  icon,
  full,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "avm-btn",
        `avm-btn--${variant}`,
        icon && "avm-btn--icon",
        full && "avm-btn--full",
        size === "sm" && "avm-btn--sm",
        size === "lg" && "avm-btn--lg",
        className
      )}
      {...props}
    >
      {loading && <span className="avm-btn__spinner" />}
      {children}
    </Link>
  );
}

