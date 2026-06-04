"use client";

import FadeUp from "@/components/ui/FadeUp";
import Marquee from "@/components/ui/Marquee";

const stats = [
  { value: "10,000+", label: "Tonnes traded" },
  { value: "300+", label: "Export shipments" },
  { value: "10+", label: "Countries served" },
  { value: "20+", label: "Years in the trade" },
];

const destinations = [
  "UAE",
  "United Kingdom",
  "Malaysia",
  "Kuwait",
  "Qatar",
  "Saudi Arabia",
  "Sri Lanka",
  "Bangladesh",
  "Nepal",
  "Mauritius",
];

export default function TrackRecord() {
  return (
    <section id="track-record" className="bg-soil py-24 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Label */}
        <FadeUp>
          <p className="font-fraunces text-xs tracking-[0.2em] uppercase text-blush/70 mb-10 text-center lg:text-left">
            Track Record
          </p>
        </FadeUp>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-20">
          {stats.map((stat, i) => (
            <FadeUp key={stat.label} delay={i * 0.1}>
              <div className="flex flex-col gap-2 border-l-2 border-terracotta/40 pl-5">
                <span className="font-poppins font-extrabold text-5xl lg:text-6xl text-cream leading-none tabular-nums">
                  {stat.value}
                </span>
                <span className="font-poppins text-sm text-cream/50 font-medium tracking-wide">
                  {stat.label}
                </span>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>

      {/* Marquee — full bleed */}
      <FadeUp>
        <div className="border-t border-cream/10 border-b py-5">
          <Marquee
            items={destinations}
            separator="·"
            className="font-poppins font-semibold text-base text-cream/60 tracking-widest uppercase"
            speed="20s"
          />
        </div>
      </FadeUp>
    </section>
  );
}
