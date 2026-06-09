"use client";

import FadeUp from "@/components/ui/FadeUp";
import RevealText from "@/components/ui/RevealText";
import Link from "next/link";
import Image from "next/image";

export default function WhatsNext() {
  return (
    <section className="relative py-24 lg:py-36 bg-cream overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-30">
        <Image
          src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1600&q=60"
          alt=""
          fill
          className="object-cover"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-cream/85" />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 lg:px-12 text-center flex flex-col items-center gap-8">
        <FadeUp>
          <p className="font-fraunces text-[1.35rem] tracking-[0.2em] uppercase text-terracotta">
            What&apos;s Next
          </p>
        </FadeUp>

        <RevealText
          as="h2"
          className="font-poppins font-bold text-3xl sm:text-5xl lg:text-6xl text-soil leading-tight"
          delay={0.1}
        >
          Built for what the world needs next.
        </RevealText>

        <FadeUp delay={0.25}>
          <p className="max-w-2xl text-soil/65 font-poppins text-base sm:text-lg leading-relaxed">
            The world wants Indian onions in more forms and more places. We&apos;re scaling our dehydrated onion and fried onion (birista) supply, deepening long-term partnerships with food manufacturers and importers, and opening new export markets — backed by the same sourcing and quality discipline that built our name over two generations.
          </p>
        </FadeUp>

        <FadeUp delay={0.35}>
          <Link
            href="#contact"
            className="px-8 py-4 bg-soil text-cream font-poppins font-semibold rounded-full hover:bg-maroon transition-colors duration-300 text-sm tracking-wide mt-2"
          >
            Start a Conversation
          </Link>
        </FadeUp>
      </div>
    </section>
  );
}
