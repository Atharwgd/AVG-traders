import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-soil text-cream/60 py-14 lg:py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="flex flex-col gap-4 lg:col-span-2">
            <p className="font-poppins font-bold text-xl text-cream tracking-tight">
              AVG <span className="text-terracotta">Traders</span>
            </p>
            <p className="font-poppins text-sm leading-relaxed max-w-xs">
              Trusted traders and exporters from the Nashik belt — supplying fresh onions, ginger, and dehydrated onion products worldwide since the early 2000s.
            </p>
            <a
              href="https://www.linkedin.com/company/avg-traders/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm hover:text-cream transition-colors"
              aria-label="AVG Traders on LinkedIn"
            >
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                <circle cx="4" cy="4" r="2" />
              </svg>
              LinkedIn
            </a>
          </div>

          {/* Navigation */}
          <div>
            <p className="font-poppins font-semibold text-xs uppercase tracking-widest text-cream/40 mb-4">
              Navigation
            </p>
            <ul className="flex flex-col gap-2.5">
              {[
                ["About", "#about"],
                ["Products", "#products"],
                ["Track Record", "#track-record"],
                ["Process", "#process"],
                ["Gallery", "#gallery"],
                ["Contact", "#contact"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="font-poppins text-sm hover:text-cream transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-poppins font-semibold text-xs uppercase tracking-widest text-cream/40 mb-4">
              Contact
            </p>
            <div className="flex flex-col gap-3 font-poppins text-sm">
              <a href="mailto:business@avgtraders.com" className="hover:text-cream transition-colors">
                business@avgtraders.com
              </a>
              <a href="tel:+917058875028" className="hover:text-cream transition-colors">
                +91 70588 75028
              </a>
              <address className="not-italic leading-relaxed text-cream/50">
                Andarsul, 423402<br />
                Tal - Yeola, Nashik<br />
                Maharashtra, India
              </address>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-cream/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-poppins">
          <p>© {year} AVG Traders. All rights reserved.</p>
          <p className="text-cream/35">
            APEDA Recognised · IEC Holder · FSSAI Certified
          </p>
        </div>
      </div>
    </footer>
  );
}
