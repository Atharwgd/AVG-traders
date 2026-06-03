"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface RevealTextProps {
  children: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  splitBy?: "words" | "chars";
}

export default function RevealText({
  children,
  className = "",
  delay = 0,
  as: Tag = "h2",
  splitBy = "words",
}: RevealTextProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  const units =
    splitBy === "words"
      ? children.split(" ").map((w) => w + " ")
      : children.split("");

  return (
    <Tag ref={ref as React.RefObject<never>} className={`overflow-hidden ${className}`} aria-label={children}>
      <span className="flex flex-wrap" aria-hidden="true">
        {units.map((unit, i) => (
          <span
            key={i}
            className="overflow-hidden inline-block"
            style={{ lineHeight: "1.15" }}
          >
            <motion.span
              className="inline-block"
              initial={{ y: "110%", opacity: 0 }}
              animate={inView ? { y: "0%", opacity: 1 } : {}}
              transition={{
                duration: 0.75,
                ease: [0.16, 1, 0.3, 1],
                delay: delay + i * 0.055,
              }}
            >
              {unit}
            </motion.span>
          </span>
        ))}
      </span>
    </Tag>
  );
}
