import { fileURLToPath } from "node:url";

const modernPolyfill = fileURLToPath(new URL("./lib/modern-polyfill.js", import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
 productionBrowserSourceMaps: true,
 reactCompiler: true,
 turbopack: {
  resolveAlias: {
   "../build/polyfills/polyfill-module": "./lib/modern-polyfill.js",
  },
 },
 webpack(config) {
  config.resolve.alias["../build/polyfills/polyfill-module"] = modernPolyfill;
  return config;
 },
 experimental: {
  proxyClientMaxBodySize: "32mb",
  inlineCss: true,
  optimizePackageImports: [
   "embla-carousel-react",
   "react-icons",
   "react-icons/md",
   "react-icons/fa",
   "react-icons/lu",
   "react-icons/tb",
   "radix-ui",
  ],
 },
 async headers() {
  return [
   {
    source: "/llms.txt",
    headers: [
     {
      key: "Cache-Control",
      value: "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
     },
    ],
   },
   {
    source: "/og-image.png",
    headers: [
     {
      key: "X-Robots-Tag",
      value: "noindex",
     },
    ],
   },
   {
    source: "/slayts/:path*",
    headers: [
     {
      key: "X-Robots-Tag",
      value: "noindex",
     },
    ],
   },
  ];
 },
 async rewrites() {
  return [
   {
    source: "/favicon.ico",
    destination: "/brand/favicon.ico",
   },
  ];
 },
 async redirects() {
  return [
   {
    source: "/kvkk",
    destination: "/politikalar",
    permanent: true,
   },
   {
    source: "/gizlilik-politikasi",
    destination: "/politikalar",
    permanent: true,
   },
   {
    source: "/cerez-politikasi",
    destination: "/politikalar",
    permanent: true,
   },
  ];
 },
 images: {
  deviceSizes: [320, 384, 420, 480, 560, 640, 750, 828, 1080, 1200, 1600, 1920, 2560],
  qualities: [60, 75, 92],
  remotePatterns: [
   {
    protocol: "https",
    hostname: "res.cloudinary.com",
    pathname: "/**",
   },
  ],
 },
};

export default nextConfig;
