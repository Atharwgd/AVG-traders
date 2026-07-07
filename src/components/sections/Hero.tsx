"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const words = ["From", "the", "soil", "of", "Nashik", "to", "tables", "across", "the", "world."];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  useEffect(() => {
    const timer = setTimeout(() => setInView(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      id="hero"
    >
      {/* Background image with parallax */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: imageY }}
      >
        <Image
          src="/hero.png"
          alt="AVG Traders — onion trading and export operations, Nashik, Maharashtra"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-soil/55" />
        {/* Warm colour wash */}
        <div className="absolute inset-0 bg-gradient-to-b from-maroon/20 via-transparent to-soil/40" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-12 pt-24 pb-28 text-center flex flex-col items-center gap-7">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="font-fraunces text-xs sm:text-sm tracking-[0.2em] uppercase text-blush/90"
        >
          Onion Traders & Exporters · Nashik, India
        </motion.p>

        {/* Headline — split-text staggered reveal */}
        <h1 className="font-poppins font-extrabold text-4xl sm:text-6xl lg:text-7xl xl:text-8xl text-cream leading-[1.05] tracking-tight flex flex-wrap justify-center gap-x-3 gap-y-1" aria-label="From the soil of Nashik to tables across the world.">
          {words.map((word, i) => (
            <span key={i} className="overflow-hidden inline-block" aria-hidden="true">
              <motion.span
                className="inline-block"
                initial={{ y: "110%", opacity: 0 }}
                animate={inView ? { y: "0%", opacity: 1 } : {}}
                transition={{
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.3 + i * 0.06,
                }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Sub-line */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.95 }}
          className="max-w-2xl text-cream/75 font-poppins font-normal text-base sm:text-lg leading-relaxed"
        >
          AVG Traders supplies India's finest produce — fresh onions and ginger, dehydrated onion flakes, powder, and fried onion (birista) — graded honestly and shipped exactly as promised.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 1.15 }}
          className="flex flex-col sm:flex-row items-center gap-4 mt-2"
        >
          <Link
            href="#products"
            className="px-8 py-4 bg-terracotta text-cream font-poppins font-semibold rounded-full hover:bg-maroon transition-colors duration-300 text-sm tracking-wide"
          >
            What We Trade →
          </Link>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 1.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex-col items-center gap-2 hidden [@media(min-height:640px)]:flex"
      >
        <span className="font-poppins text-xs tracking-[0.2em] uppercase text-cream/50">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-10 bg-gradient-to-b from-cream/50 to-transparent"
        />
      </motion.div>
    </section>
  );
}
