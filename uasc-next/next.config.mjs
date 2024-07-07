const env = process.env.NEXT_CONFIG_ENV || "development"
/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ["@svgr/webpack"]
    })

    return config
  },
  experimental: {
    turbo: {
      rules: {
        "*.svg": {
          loaders: ["@svgr/webpack"],
          as: "*.js"
        }
      }
    }
  },
  // We want static files that we can deploy to firebase hosting
  output: env === "staging" || env === "production" ? "export" : undefined,
  trailingSlash: true
}

export default nextConfig
