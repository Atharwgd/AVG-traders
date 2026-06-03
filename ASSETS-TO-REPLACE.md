# ASSETS TO REPLACE

A checklist of every placeholder that needs a real asset or confirmed value before launch.

---

## LOGO

- [ ] **Site logo** — Currently text-only ("AVG Exports"). Replace with a proper logotype/wordmark in `src/app/favicon.ico` and add an `<Image>` component in `NavBar.tsx` and `Footer.tsx`.
- [ ] **Favicon** — Replace `/public/favicon.ico` (currently Next.js default).
- [ ] **OG image** — Add a 1200×630 branded image at `/public/og-image.jpg` and reference in `layout.tsx` metadata.

---

## PHOTOS — Operations (Gallery section)

Replace Unsplash placeholders in `src/components/sections/Gallery.tsx` with real photos from your facility:

| Slot | File to supply | Current placeholder |
|------|---------------|---------------------|
| 1 | Warehouse / stored onion stock | Unsplash farm photo |
| 2 | Grading & labour unit (workers sorting onions) | Unsplash sorting photo |
| 3 | Packing operation | Unsplash packing photo |
| 4 | Container loading / previous shipment | Unsplash container photo |
| 5 | Team / founder photo | Unsplash group photo |
| 6 | Mandi / sourcing visit | Unsplash market photo |

---

## PHOTOS — Products (`src/components/sections/Products.tsx`)

| Product | Alt text hint | Current placeholder |
|---------|--------------|---------------------|
| Dehydrated Onion Flakes | Close-up of white/pink flakes | Unsplash spice photo |
| Dehydrated Onion Powder | Powder in bowl or scoop | Unsplash powder photo |
| Red Onion | Pile of Nashik red onions | Unsplash red onion photo |
| Pink Onion | Pile of pink/rose onions | Unsplash pink onion photo |
| White Onion | White onions in bulk | Unsplash white onion photo |

---

## PHOTO — About section (`src/components/sections/About.tsx`)

- [ ] Replace Unsplash portrait with **real founder / team photo** taken at the showroom or facility.

---

## CONTACT DETAILS (update in 3 places: `Contact.tsx`, `Footer.tsx`, `layout.tsx`)

- [ ] **Business email** — replace `trade@avgexports.com` with your actual dedicated business email.
- [ ] **Phone / WhatsApp** — replace `+91 99999 99999` with real number.
- [ ] **Address** — confirm "Yeola, Nashik District, Maharashtra 423401" or provide correct address.
- [ ] **LinkedIn URL** — replace `https://linkedin.com` in `Footer.tsx` with your company page URL.
- [ ] **Website domain** — update `openGraph.url` in `src/app/layout.tsx` once you have the domain.

---

## PRODUCT SPECS — Please confirm or correct these industry defaults

These values are reasonable defaults — confirm they match your actual grading/supply:

### Red Onion
- [ ] Sizes: 35–45mm, 45–55mm, 55mm+
- [ ] Availability: Year-round (confirm seasonality if applicable)

### Pink Onion
- [ ] Sizes: 40–50mm, 50–60mm
- [ ] Flavour profile: Mild–Medium

### White Onion
- [ ] Sizes: 40–50mm, 50–60mm

### Dehydrated Onion Flakes
- [ ] Cuts: Kibbled / Chopped / Minced — confirm which cuts you actually supply
- [ ] Moisture: <5% — confirm this spec
- [ ] Colours: White & Red/Pink — confirm

### Dehydrated Onion Powder
- [ ] Mesh: Food-grade — confirm specific mesh size (e.g. 40–60 mesh)
- [ ] Moisture: <5% — confirm this spec
- [ ] Granule sizes if applicable

---

## COPY TO CONFIRM

- [ ] **Stats in TrackRecord section** — confirm these figures are accurate:
  - 5,000+ Tonnes traded
  - 100+ Export shipments
  - 7+ Countries served
  - 15+ Years in the trade
- [ ] **Destination countries in marquee** — confirm/extend the list: UAE, UK, Malaysia, Kuwait, Qatar, Saudi Arabia, Sri Lanka, Bangladesh, Nepal, Mauritius
- [ ] **"15+ years in the trade"** — adjust if founding year differs

---

## CERTIFICATIONS (confirm before launch)

- [x] APEDA Recognised — stated as confirmed in brief
- [x] IEC (Import Export Code) Holder — stated as confirmed
- [x] FSSAI Certified — stated as confirmed
- [ ] Any other certifications to add (organic, halal, ISO, etc.)?

---

## SEO / META

- [ ] Confirm site domain and add to `openGraph.url` in `layout.tsx`
- [ ] Add real OG image (1200×630px branded graphic)
- [ ] Add `robots.txt` if needed (currently Next.js default)
- [ ] Add `sitemap.xml` via Next.js metadata API when site goes live
