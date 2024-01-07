import { expect, describe, it } from 'vitest';
import { nameToCabalNumber } from './cabalMath.ts';

describe('cabalMath', () => {
  it.each([
    ['reginaldo', 4],
    ['amanda', 7],
    ['jonathan', 11],
    ['wesley', 5],
    ['higor', 9],
    ['lui', 1]
  ])('should match name: %s with cabal number: %s based on cabal table', (name, number) => {
    expect(nameToCabalNumber(name)).toBe(number);
  })
})
