"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost";
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit";
}

export default function Button({
  href,
  onClick,
  variant = "primary",
  children,
  className = "",
  type = "button",
}: ButtonProps) {
  const base =
    "relative inline-flex items-center gap-2 font-poppins font-semibold text-sm tracking-wide transition-all duration-300 focus-visible:outline-none";

  const styles = {
    primary:
      "px-7 py-3.5 bg-terracotta text-cream rounded-full hover:bg-maroon",
    ghost:
      "px-0 py-1 text-soil border-b border-soil/40 hover:border-soil rounded-none",
  };

  const Wrapper = motion.div;
  const content = (
    <Wrapper
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="inline-flex"
    >
      <span className={`${base} ${styles[variant]} ${className}`}>
        {children}
      </span>
    </Wrapper>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return (
    <button type={type} onClick={onClick} className="focus-visible:outline-none">
      {content}
    </button>
  );
}
