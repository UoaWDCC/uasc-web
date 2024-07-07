const env = process.env.NEXT_CONFIG_ENV || "development"

const customBasePath = process.env.DEPLOYMENT_BASE_PATH

const generateStatic = env === "staging" || env === "production"

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: customBasePath,
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
  output: generateStatic ? "export" : undefined,
  // Need this to allow static site generation to work with firebase hosting
  trailingSlash: generateStatic,
  images: {
    // TODO: remove this and use an image CDN
    unoptimized: generateStatic
  }
}

export default nextConfig
