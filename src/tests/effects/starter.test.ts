import { describe, expect, it } from 'vitest';
import * as Effect from '@effect/io/Effect';
import * as Random from '@effect/io/Random';
import { pipe } from '@effect/data/Function';
import { runSync } from '@effect/io/Effect';

describe('Effect Starter Examples', () => {
  it('Should flip the coin', async () => {
    // Effect<never, never, void>
    const flipTheCoin = Effect.if(Random.nextBoolean, {
      onTrue: pipe(Effect.succeed('Head')),
      onFalse: pipe(Effect.succeed('Tail')),
    });

    ;

    const result = runSync(flipTheCoin);
    expect(result).toBe('Head' || 'Tail');
  });
});
