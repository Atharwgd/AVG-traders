import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export — no Node server at runtime. Build outputs to ./out,
  // which Hostinger serves as plain static files (near-zero resource use).
  // Security headers previously set here now live in public/.htaccess, since
  // export mode has no server to apply them. Also see the Google Apps Script
  // form endpoint (contact form no longer needs a server route).
  output: "export",
  images: {
    // Required for static export — no image optimization server.
    unoptimized: true,
  },
};

export default nextConfig;
