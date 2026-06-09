"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import FadeUp from "@/components/ui/FadeUp";
import RevealText from "@/components/ui/RevealText";

const photos = [
  {
    src: "/storage-stock.jpg",
    alt: "AVG Traders onion storage warehouse — bulk red onions stored at our facility in Nashik",
    caption: "Storage & Stock",
    span: "lg:col-span-2",
  },
  {
    src: "/grading-sorting.jpg",
    alt: "Onion grading and sorting — workers hand-sorting red onions at AVG Traders facility",
    caption: "Grading & Sorting",
    span: "",
  },
  {
    src: "/packing.jpg",
    alt: "Packed onion bags — red onions packed in mesh bags ready for export",
    caption: "Packing",
    span: "",
  },
  {
    src: "/container-loading.png",
    alt: "Container loading — workers loading packed onion bags into an export container",
    caption: "Container Loading",
    span: "lg:col-span-2 lg:col-start-1",
  },
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-24 lg:py-36 bg-soil">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="max-w-2xl mb-14">
          <FadeUp>
            <p className="font-fraunces text-lg tracking-[0.2em] uppercase text-blush/70 mb-6">
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
              Real stock, real people, real containers — from our facility in the Nashik onion belt.
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
