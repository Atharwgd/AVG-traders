"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import FadeUp from "@/components/ui/FadeUp";
import RevealText from "@/components/ui/RevealText";

const photos = [
  {
    src: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80",
    alt: "Stored onion stock — [PLACEHOLDER: Replace with photo of AVG Exports warehouse / stored stock]",
    caption: "Storage & Stock",
    span: "lg:col-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&q=80",
    alt: "Onion grading and sorting — [PLACEHOLDER: Replace with photo of grading/labour unit]",
    caption: "Grading & Sorting",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?w=800&q=80",
    alt: "Onion packing — [PLACEHOLDER: Replace with photo of packing operation]",
    caption: "Packing",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80",
    alt: "Container loading — [PLACEHOLDER: Replace with photo of previous shipment / container loading]",
    caption: "Container Loading",
    span: "lg:col-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80",
    alt: "AVG Exports team — [PLACEHOLDER: Replace with team photo]",
    caption: "The Team",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=800&q=80",
    alt: "Nashik onion mandi — [PLACEHOLDER: Replace with mandi or sourcing photo]",
    caption: "Sourcing — Nashik Mandi",
    span: "",
  },
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-24 lg:py-36 bg-soil">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="max-w-2xl mb-14">
          <FadeUp>
            <p className="font-fraunces text-xs tracking-[0.2em] uppercase text-blush/70 mb-6">
              On the Ground
            </p>
          </FadeUp>
          <RevealText
            as="h2"
            className="font-poppins font-bold text-3xl sm:text-4xl lg:text-5xl text-cream leading-tight"
          >
            The operation behind every shipment.
          </RevealText>
          <FadeUp delay={0.2}>
            <p className="mt-5 text-cream/55 font-poppins text-base leading-relaxed">
              Every photo below shows what we actually do — real stock, real people, real containers. These placeholders will be replaced with images from our facility.
            </p>
          </FadeUp>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {photos.map((photo, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.07 }}
              className={`relative rounded-xl overflow-hidden group ${photo.span}`}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-soil/70 via-transparent to-transparent" />
                {/* Caption */}
                <figcaption className="absolute bottom-4 left-4 font-poppins text-xs font-medium text-cream/80 tracking-wide uppercase">
                  {photo.caption}
                </figcaption>
              </div>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
