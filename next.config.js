// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {

  typescript: {
    ignoreBuildErrors: true, // Ignore TypeScript errors
  },
  eslint: {
    ignoreDuringBuilds: true, // Ignore ESLint errors
  },
  reactStrictMode: false,
  // swcMinify: true, // Uncomment if you want to enable SWC minification
  compiler: {
    styledComponents: true,
    // Note: The `images` configuration should be moved out of `compiler` and placed at the root level
  },
  images: {
    path: "",
    domains: ["localhost", "cdn.discordapp.com"], // Added domain for Discord icons
  },
  webpack: (config) => {
    config.ignoreWarnings = [
      { module: /node_modules\/node-fetch\/lib\/index\.js/ },
      { file: /node_modules\/node-fetch\/lib\/index\.js/ },
    ];
    // Prevent bundling of these dependencies, useful for server-side rendering
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
  
};

module.exports = nextConfig;
