"use client";

import { useState } from "react";
import FadeUp from "@/components/ui/FadeUp";
import RevealText from "@/components/ui/RevealText";

type FormState = "idle" | "loading" | "success" | "error";

const products = [
  "Red Onion",
  "Pink Onion",
  "White Onion",
  "Fresh Ginger",
  "Onion Flakes (Dehydrated)",
  "Onion Powder (Dehydrated)",
  "Fried Onion / Birista",
  "Multiple / Other",
];

export default function Contact() {
  const [state, setState] = useState<FormState>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("loading");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setState("success");
        form.reset();
      } else {
        setState("error");
      }
    } catch {
      setState("error");
    }
  }

  const inputClass =
    "w-full bg-cream border border-sand rounded-xl px-4 py-3.5 font-poppins text-sm text-soil placeholder-soil/40 focus:outline-none focus:border-terracotta/60 focus:ring-2 focus:ring-terracotta/20 transition-all duration-200";

  return (
    <section id="contact" className="py-24 lg:py-36 bg-sand/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left — copy */}
          <div className="flex flex-col gap-8">
            <div>
              <FadeUp>
                <p className="font-fraunces text-base sm:text-lg tracking-[0.2em] uppercase text-terracotta mb-6">
                  Get in Touch
                </p>
              </FadeUp>
              <RevealText
                as="h2"
                className="font-poppins font-bold text-3xl sm:text-4xl lg:text-5xl text-soil leading-tight"
              >
                Let&apos;s talk about your requirements.
              </RevealText>
            </div>

            <FadeUp delay={0.2}>
              <p className="text-soil/65 font-poppins text-base leading-relaxed">
                Whether you have a specific grade in mind or want to know what we can reliably supply, we&apos;re happy to talk. No sales pressure — just a direct discussion about fit.
              </p>
            </FadeUp>

            {/* Contact details */}
            <FadeUp delay={0.3}>
              <div className="flex flex-col gap-4 text-sm font-poppins text-soil/70">
                <div className="flex items-start gap-3">
                  <span className="text-terracotta mt-0.5">✉</span>
                  <div>
                    <div className="text-soil/40 text-xs uppercase tracking-wide mb-0.5">Email</div>
                    <a href="mailto:business@avgtraders.com" className="hover:text-terracotta transition-colors">
                      business@avgtraders.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-terracotta mt-0.5">📞</span>
                  <div>
                    <div className="text-soil/40 text-xs uppercase tracking-wide mb-0.5">Phone / WhatsApp</div>
                    <a href="tel:+917058875028" className="hover:text-terracotta transition-colors">
                      +91 70588 75028
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-terracotta mt-0.5">📍</span>
                  <div>
                    <div className="text-soil/40 text-xs uppercase tracking-wide mb-0.5">Address</div>
                    {/* PLACEHOLDER: Replace with real office address */}
                    <address className="not-italic leading-relaxed">
                      Atul Vilas Gade AVG Onion Suppliers<br />
                      Chatrapati Sambhajinagar - Nashik Highway<br />
                      Andarsul, 423402<br />
                      Tal - Yeola, Nashik, Maharashtra
                    </address>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>

          {/* Right — form */}
          <FadeUp delay={0.15}>
            <form
              onSubmit={handleSubmit}
              suppressHydrationWarning
              className="bg-cream rounded-2xl border border-sand p-8 flex flex-col gap-5"
            >
              {/* Honeypot — hidden from real users, catches bots */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block font-poppins text-xs font-medium text-soil/60 uppercase tracking-wide mb-2">
                    Full Name <span className="text-terracotta">*</span>
                  </label>
                  <input id="name" name="name" type="text" required placeholder="Your name" className={inputClass} />
                </div>
                <div>
                  <label htmlFor="company" className="block font-poppins text-xs font-medium text-soil/60 uppercase tracking-wide mb-2">
                    Company
                  </label>
                  <input id="company" name="company" type="text" placeholder="Company name" className={inputClass} />
                </div>
              </div>

              <div>
                <label htmlFor="country" className="block font-poppins text-xs font-medium text-soil/60 uppercase tracking-wide mb-2">
                  Country <span className="text-terracotta">*</span>
                </label>
                <input id="country" name="country" type="text" required placeholder="Country of import" className={inputClass} />
              </div>

              <div>
                <label htmlFor="product" className="block font-poppins text-xs font-medium text-soil/60 uppercase tracking-wide mb-2">
                  Product Interest <span className="text-terracotta">*</span>
                </label>
                <select id="product" name="product" required className={`${inputClass} appearance-none`}>
                  <option value="">Select a product</option>
                  {products.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="quantity" className="block font-poppins text-xs font-medium text-soil/60 uppercase tracking-wide mb-2">
                  Estimated Quantity
                </label>
                <input id="quantity" name="quantity" type="text" placeholder="e.g. 20 MT per month" className={inputClass} />
              </div>

              <div>
                <label htmlFor="message" className="block font-poppins text-xs font-medium text-soil/60 uppercase tracking-wide mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Tell us about your requirements, target grade, or any other details..."
                  className={`${inputClass} resize-none`}
                />
              </div>

              <button
                type="submit"
                disabled={state === "loading"}
                className="w-full py-4 bg-terracotta text-cream font-poppins font-semibold rounded-full hover:bg-maroon transition-colors duration-300 text-sm tracking-wide disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {state === "loading" ? "Sending…" : "Send Inquiry"}
              </button>

              {state === "success" && (
                <p className="text-center text-sm font-poppins text-olive font-medium">
                  ✓ Inquiry sent. We&apos;ll be in touch within 24 hours.
                </p>
              )}
              {state === "error" && (
                <p className="text-center text-sm font-poppins text-maroon font-medium">
                  Something went wrong. Please email us directly.
                </p>
              )}
            </form>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
