/**
 * Wraps an unreachable case value with an error object, allowing the caller to throw.
 *
 * @example
 * ```ts
 * switch (num) {
 * 		case 1: {
 * 			// ...
 * 			return
 * 		}
 * 		case 2: {
 * 			// ...
 * 			return
 * 		}
 * 		default: {
 * 			// codebase assumes that we have exhausted all possible cases
 * 			// but at runtime we reached an unhandled case
 * 			throw unreachableCase(num)
 * 		}
 * }
 * ```
 * @param value The unreachable case.
 * @returns An error to throw.
 */
export class UnreachableCase extends Error {
  public constructor(value: never) {
    super(`Reached unreachable case for value '${value}'`)
  }
}
