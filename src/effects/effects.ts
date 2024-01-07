import * as Effect from '@effect/io/Effect';

const increment = (x: number) => x + 1

const divide = (a: number, b: number): Effect.Effect<never, Error, number> =>
  b === 0
    ? Effect.fail(new Error("Cannot divide by zero"))
    : Effect.succeed(a / b)

const foo = Effect.succeed(10)
const bar = Effect.succeed(2)

// Effect<never, Error, string>
export const program = Effect.all([foo, bar]).pipe(
  Effect.flatMap(([a, b]) => divide(a, b)),
  Effect.map((n1) => increment(n1)),
  Effect.map((n1) => n1 + 4),
  Effect.map((n2) => `Result is: ${n2}`)
)

