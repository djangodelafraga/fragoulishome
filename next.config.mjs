/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.supabase.co" },
    ],
  },
  // TODO: Add security headers (CSP, X-Frame-Options, Referrer-Policy, Permissions-Policy, etc.).
  // async headers() {
  //   return [
  //     {
  //       source: "/(.*)",
  //       headers: [
  //         { key: "X-Frame-Options", value: "DENY" },
  //         { key: "X-Content-Type-Options", value: "nosniff" },
  //         { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  //       ],
  //     },
  //   ];
  // },
  // TODO: Add redirects/rewrites if needed for legacy URLs.
};

export default nextConfig;