"use client";

import Image from "next/image";
import FadeUp from "@/components/ui/FadeUp";
import RevealText from "@/components/ui/RevealText";

export default function About() {
  return (
    <section id="about" className="py-24 lg:py-36 bg-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section label */}
        <FadeUp>
          <p className="font-fraunces text-base sm:text-lg tracking-[0.2em] uppercase text-terracotta mb-8">
            Who We Are
          </p>
        </FadeUp>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left — text */}
          <div className="flex flex-col gap-8">
            <RevealText
              as="h2"
              className="font-poppins font-bold text-3xl sm:text-4xl lg:text-5xl text-soil leading-tight"
              delay={0.1}
            >
              We know onions — and we know the people who grow them.
            </RevealText>

            <FadeUp delay={0.2}>
              <div className="flex flex-col gap-5 text-soil/75 font-poppins text-base leading-relaxed">
                <p>
                  AVG Traders is a trading and export house rooted in the Nashik onion belt — the Lasalgaon–Yeola region that moves more onions than anywhere else in India. We're the link that makes sure the right onions, at the right grade, reach buyers who can't afford surprises.
                </p>
                <p>
                  What we do is exactly what matters in this trade: sourcing from growers and mandis we actually know, grading honestly, packing properly, and handling documentation and logistics so every container lands clean and on time. For two generations, our family has built its name trading through these markets.
                </p>
                <p>
                  Buyers come back because we'd rather lose a deal than ship a product we wouldn't stand behind. That discipline runs through everything we trade — fresh onions and ginger, and the dehydrated onion flakes, powder, and fried onion (birista) we supply worldwide.
                </p>
              </div>
            </FadeUp>

            {/* Pull-quote */}
            <FadeUp delay={0.35}>
              <blockquote className="border-l-4 border-terracotta pl-6 py-2">
                <p className="font-fraunces text-xl sm:text-2xl text-terracotta leading-snug italic">
                  "We'd rather lose a deal than ship an onion we wouldn't stand behind."
                </p>
              </blockquote>
            </FadeUp>
          </div>

          {/* Right — image */}
          <FadeUp delay={0.25} className="relative">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              {/* PLACEHOLDER IMAGE: Replace with founder / team photo at showroom or facility */}
              <Image
                src="/storage-stock.jpg"
                alt="AVG Traders — bulk red onions stored at our facility in Nashik"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Warm tint overlay */}
              <div className="absolute inset-0 bg-maroon/10 mix-blend-multiply" />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-40 h-40 rounded-2xl bg-sand/60 -z-10" />
            <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-blush/40 -z-10" />
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
