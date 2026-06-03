"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface Chip {
  label: string;
  value: string;
}

interface ProductCardProps {
  name: string;
  descriptor: string;
  chips: Chip[];
  imageSrc: string;
  imageAlt: string;
  accentColor: "maroon" | "terracotta" | "olive";
  index?: number;
}

const accentStyles = {
  maroon: {
    border: "border-maroon/20 hover:border-maroon/50",
    chipBg: "bg-maroon/10 text-maroon",
    accent: "bg-maroon",
    label: "text-maroon",
  },
  terracotta: {
    border: "border-terracotta/20 hover:border-terracotta/50",
    chipBg: "bg-terracotta/10 text-terracotta",
    accent: "bg-terracotta",
    label: "text-terracotta",
  },
  olive: {
    border: "border-olive/20 hover:border-olive/50",
    chipBg: "bg-olive/10 text-olive",
    accent: "bg-olive",
    label: "text-olive",
  },
};

export default function ProductCard({
  name,
  descriptor,
  chips,
  imageSrc,
  imageAlt,
  accentColor,
  index = 0,
}: ProductCardProps) {
  const styles = accentStyles[accentColor];

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
      className={`group rounded-2xl border ${styles.border} bg-cream overflow-hidden flex flex-col transition-all duration-500 hover:shadow-xl hover:-translate-y-1`}
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-soil/40 to-transparent" />
      </div>

      {/* Body */}
      <div className="flex flex-col gap-3 p-6 flex-1">
        <h3 className={`font-poppins font-bold text-lg text-soil`}>{name}</h3>
        <p className="font-poppins text-sm text-soil/65 leading-relaxed">{descriptor}</p>

        {/* Chips */}
        <div className="flex flex-wrap gap-2 mt-auto pt-3">
          {chips.map((chip) => (
            <span
              key={chip.label}
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-poppins font-medium ${styles.chipBg}`}
            >
              <span className="opacity-60">{chip.label}:</span>
              <span>{chip.value}</span>
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
