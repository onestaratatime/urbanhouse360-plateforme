import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Pour générer un site statique compatible Netlify
  images: {
    unoptimized: true, // Nécessaire pour l'export statique
  },
};

export default nextConfig;
