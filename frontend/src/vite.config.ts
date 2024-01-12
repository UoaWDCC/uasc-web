const { loadEnvConfig } = require("next-env")

const withEnv = () => {
  const env = loadEnvConfig(__dirname)
  return { env: env.parsed }
}

module.exports = withEnv()
