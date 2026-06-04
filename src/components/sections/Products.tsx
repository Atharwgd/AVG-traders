"use client";

import ProductCard from "@/components/ui/ProductCard";
import FadeUp from "@/components/ui/FadeUp";
import RevealText from "@/components/ui/RevealText";
import Link from "next/link";

const dehydratedProducts = [
  {
    name: "Dehydrated Onion Flakes",
    descriptor:
      "Premium dried onion in kibbled, chopped, and minced cuts — long shelf life, consistent quality, ready for industrial use.",
    chips: [
      { label: "Cuts", value: "Kibbled / Chopped / Minced" },
      { label: "Moisture", value: "<5%" },
      { label: "Colour", value: "White & Red/Pink" },
      { label: "Use", value: "Seasoning blends, ready meals, snacks, HoReCa" },
      { label: "Pack", value: "Bulk & Retail" },
    ],
    imageSrc: "/dehydrated-onion-flakes.png",
    imageAlt: "AVG Traders dehydrated onion flakes — kibbled, chopped and minced cuts",
    accentColor: "terracotta" as const,
  },
  {
    name: "Dehydrated Onion Powder",
    descriptor:
      "Finely milled onion powder and granules with consistent colour and flavour — built for spice houses and food processors.",
    chips: [
      { label: "Forms", value: "Powder / Granules" },
      { label: "Mesh", value: "Food-grade" },
      { label: "Moisture", value: "<5%" },
      { label: "Use", value: "Spice blends, soups, sauces, snack coatings" },
      { label: "Pack", value: "Bulk & Retail" },
    ],
    imageSrc: "/dehydrated-onion-powder.png",
    imageAlt: "AVG Traders dehydrated onion powder — finely milled food-grade powder and granules",
    accentColor: "olive" as const,
  },
];

const freshProducts = [
  {
    name: "Red Onion",
    descriptor:
      "India's signature export onion: deep colour, robust flavour, dependable shelf life.",
    chips: [
      { label: "Colour", value: "Deep red/purple" },
      { label: "Sizes", value: "35–45mm, 45–55mm, 55mm+" },
      { label: "Flavour", value: "Pungent" },
      { label: "Use", value: "Retail, wholesale, food service" },
      { label: "Avail.", value: "Year-round" },
    ],
    imageSrc: "/red-onion.png",
    imageAlt: "Nashik red onions — deep colour, robust flavour, export grade",
    accentColor: "maroon" as const,
  },
  {
    name: "Pink Onion",
    descriptor:
      "Lighter and milder, with clean rose-coloured skin — favoured where buyers want a softer onion.",
    chips: [
      { label: "Colour", value: "Rose / Light red" },
      { label: "Sizes", value: "40–50mm, 50–60mm" },
      { label: "Flavour", value: "Mild–Medium" },
      { label: "Use", value: "Fresh consumption, salads, retail" },
    ],
    imageSrc: "/pink-onion.png",
    imageAlt: "Nashik pink onions — rose-coloured skin, mild to medium flavour",
    accentColor: "maroon" as const,
  },
  {
    name: "White Onion",
    descriptor:
      "Crisp, clean, and mild — and the preferred base for our dehydrated range.",
    chips: [
      { label: "Colour", value: "White" },
      { label: "Sizes", value: "40–50mm, 50–60mm" },
      { label: "Flavour", value: "Mild" },
      { label: "Use", value: "Fresh, processing, dehydration" },
    ],
    imageSrc:
      "/white-onion.png",
    imageAlt: "White onions — crisp, mild, preferred base for dehydrated onion products",
    accentColor: "maroon" as const,
  },
];

export default function Products() {
  return (
    <section id="products" className="py-24 lg:py-36 bg-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="max-w-2xl mb-16 lg:mb-20">
          <FadeUp>
            <p className="font-fraunces text-xs tracking-[0.2em] uppercase text-terracotta mb-6">
              What We Trade
            </p>
          </FadeUp>
          <RevealText
            as="h2"
            className="font-poppins font-bold text-3xl sm:text-4xl lg:text-5xl text-soil leading-tight"
            delay={0.1}
          >
            Two product lines. Equal depth. Same standard.
          </RevealText>
          <FadeUp delay={0.25}>
            <p className="mt-5 text-soil/65 font-poppins text-base leading-relaxed">
              Whether you need a container of fresh onions or a tonne of dehydrated flakes, the process behind it is identical: careful sourcing, honest grading, and documentation that holds up to scrutiny.
            </p>
          </FadeUp>
        </div>

        {/* ── DEHYDRATED ONIONS — featured first ── */}
        <div className="mb-16 lg:mb-20">
          <FadeUp>
            <div className="flex items-center gap-4 mb-8">
              <span className="h-px flex-1 bg-terracotta/20" />
              <h3 className="font-poppins font-bold text-xs tracking-[0.2em] uppercase text-terracotta">
                Dehydrated Onions
              </h3>
              <span className="h-px flex-1 bg-terracotta/20" />
            </div>
          </FadeUp>
          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {dehydratedProducts.map((product, i) => (
              <ProductCard key={product.name} {...product} index={i} />
            ))}
          </div>
        </div>

        {/* ── FRESH ONIONS ── */}
        <div>
          <FadeUp>
            <div className="flex items-center gap-4 mb-8">
              <span className="h-px flex-1 bg-maroon/20" />
              <h3 className="font-poppins font-bold text-xs tracking-[0.2em] uppercase text-maroon">
                Fresh Onions
              </h3>
              <span className="h-px flex-1 bg-maroon/20" />
            </div>
          </FadeUp>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {freshProducts.map((product, i) => (
              <ProductCard key={product.name} {...product} index={i} />
            ))}
          </div>
        </div>

        {/* CTA */}
        <FadeUp delay={0.2} className="mt-14 text-center">
          <p className="text-soil/60 font-poppins text-sm mb-5">
            Specific grade, size, or packaging requirement? We work to your spec.
          </p>
          <a
            href="#contact"
            className="inline-block px-8 py-4 bg-terracotta text-cream font-poppins font-semibold rounded-full hover:bg-maroon transition-colors duration-300 text-sm tracking-wide"
          >
            Discuss Your Requirements
          </a>
        </FadeUp>
      </div>
    </section>
  );
}
