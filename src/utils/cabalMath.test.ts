import { expect, describe, it } from 'vitest';
import { nameToCabalNumber, nameToImpression, nameToMotivation } from './cabalMath.ts';

describe('cabalMath', () => {
  it.each([
    ['reginaldo', 4],
    ['amanda', 7],
    ['jonathan', 11],
    ['wesley', 5],
    ['higor', 9],
    ['lui', 1],
  ])(
    'should match name: %s with cabal number: %s based on cabal table',
    (name, number) => {
      expect(nameToCabalNumber(name)).toBe(number);
    },
  );

  it.each([
    ['reginaldo', 5],
    ['amanda', 3],
  ])(
    'should match name: %s with life purpose/motivation: %s based on cabal table',
    (name, number) => {
      expect(nameToMotivation(name)).toBe(number);
    },
  );

  it.each([
    ['reginaldo', 8],
    ['amanda', 4],
  ])(
    'should match name: %s with person impression of itself: %s based on cabal table',
    (name, number) => {
      expect(nameToImpression(name)).toBe(number);
    },
  );
});
