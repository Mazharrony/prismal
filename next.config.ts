import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: { formats: ["image/avif", "image/webp"] },
  async redirects() {
    return [
      // One host. The apex is the canonical everywhere, so www must not serve
      // a second copy. This only fires when the proxy forwards the original
      // Host header: if `curl -sI https://www.prismal.ae/` still answers 200
      // after a deploy, add the same redirect at the proxy instead.
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.prismal.ae" }],
        destination: "https://prismal.ae/:path*",
        permanent: true,
      },
      // The previous site's URLs (live Aug–Sep 2026) land on the matching
      // section instead of a 404. Temporary on purpose: the service, work,
      // about and contact pages return at these paths in the next phase, and
      // a cached permanent redirect would keep sending people past them.
      ...["/services/websites", "/services/custom-software", "/services/ai-automation"].map((source) => ({
        source,
        destination: "/#services",
        permanent: false,
      })),
      { source: "/work", destination: "/#work", permanent: false },
      { source: "/about", destination: "/#method", permanent: false },
      { source: "/contact", destination: "/#contact", permanent: false },
      { source: "/careers", destination: "/#contact", permanent: false },
      { source: "/legal", destination: "/", permanent: false },
    ];
  },
};

export default nextConfig;
