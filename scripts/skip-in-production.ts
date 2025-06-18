/**
 * Usage: `ts-node ./scripts/skip-in-production.ts`
 *
 * Will return 0 (exit successfully) if in production, otherwise 1 (error).
 */

if (process.env.NODE_ENV === "production") {
  process.exit(0)
} else {
  process.exit(1)
}
