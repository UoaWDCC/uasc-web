/**
 * Usage: `ts-node ./scripts/not-in-production.ts`
 *
 * Will return 0 if in production, otherwise 1.
 */

if (process.env.NODE_ENV === "production") {
  process.exit(0)
} else {
  process.exit(1)
}
