"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import FadeUp from "@/components/ui/FadeUp";
import RevealText from "@/components/ui/RevealText";

const steps = [
  {
    number: "01",
    title: "Sourcing",
    description:
      "We buy directly from growers and mandis in the Lasalgaon–Yeola belt — relationships built over two generations that give us consistent access to quality stock.",
    icon: "🌾",
  },
  {
    number: "02",
    title: "Grading & Sorting",
    description:
      "Every lot is graded by size, colour, and condition to your specification. No mixed grades, no hidden surprises.",
    icon: "⚖️",
  },
  {
    number: "03",
    title: "Quality Control",
    description:
      "Pre-shipment inspection with third-party options available. We document what goes in every bag and every container.",
    icon: "🔍",
  },
  {
    number: "04",
    title: "Packaging",
    description:
      "Net bags, mesh bags, jute, cartons, or bulk — we pack to your market's requirements and label to your specification.",
    icon: "📦",
  },
  {
    number: "05",
    title: "Documentation",
    description:
      "Phytosanitary certificates, APEDA documentation, commercial invoices, packing lists, certificates of origin — clean and complete every time.",
    icon: "📋",
  },
  {
    number: "06",
    title: "Logistics & Export",
    description:
      "Coordination with freight forwarders, booking, container stuffing, and shipment tracking. We see it through to loading.",
    icon: "🚢",
  },
];

const certifications = [
  {
    name: "APEDA Recognised",
    detail: "Agricultural & Processed Food Products Export Development Authority",
  },
  {
    name: "IEC Holder",
    detail: "Import Export Code — mandatory for all Indian exporters",
  },
  {
    name: "FSSAI Certified",
    detail: "Food Safety and Standards Authority of India",
  },
  {
    name: "Phytosanitary Certificates",
    detail: "Issued per shipment — standard practice for all onion exports",
  },
];

function Step({
  step,
  index,
  total,
}: {
  step: (typeof steps)[number];
  index: number;
  total: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
      className="relative flex flex-col gap-3"
    >
      {/* Connector line — desktop */}
      {index < total - 1 && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}
          className="hidden lg:block absolute top-6 left-full w-full h-px bg-sand origin-left"
          style={{ width: "calc(100% - 1.5rem)" }}
        />
      )}

      {/* Step bubble */}
      <div className="w-12 h-12 rounded-full bg-soil flex items-center justify-center text-terracotta font-poppins font-bold text-sm shrink-0">
        {step.number}
      </div>

      <h3 className="font-poppins font-bold text-soil text-base">{step.title}</h3>
      <p className="font-poppins text-sm text-soil/65 leading-relaxed">
        {step.description}
      </p>
    </motion.div>
  );
}

export default function Process() {
  return (
    <section id="process" className="py-24 lg:py-36 bg-sand/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <FadeUp>
            <p className="font-fraunces text-base sm:text-lg tracking-[0.2em] uppercase text-terracotta mb-6">
              How It Works
            </p>
          </FadeUp>
          <RevealText
            as="h2"
            className="font-poppins font-bold text-3xl sm:text-4xl lg:text-5xl text-soil leading-tight"
          >
            From farm gate to your port — every step handled.
          </RevealText>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-6 mb-20 lg:mb-24">
          {steps.map((step, i) => (
            <Step key={step.number} step={step} index={i} total={steps.length} />
          ))}
        </div>

        {/* Certifications */}
        <FadeUp>
          <div className="border-t border-sand pt-16">
            <p className="font-fraunces text-lg sm:text-xl tracking-[0.2em] uppercase text-terracotta mb-8">
              Certifications & Compliance
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {certifications.map((cert, i) => (
                <motion.div
                  key={cert.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className="bg-cream rounded-xl border border-sand p-5 flex flex-col gap-2"
                >
                  <div className="w-8 h-8 rounded-full bg-terracotta/10 flex items-center justify-center">
                    <span className="text-terracotta text-lg font-bold">✓</span>
                  </div>
                  <h4 className="font-poppins font-bold text-soil text-sm">
                    {cert.name}
                  </h4>
                  <p className="font-poppins text-xs text-soil/55 leading-relaxed">
                    {cert.detail}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
