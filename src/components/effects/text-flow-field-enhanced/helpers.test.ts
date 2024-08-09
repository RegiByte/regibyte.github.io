import { describe, it, expect } from 'vitest';
import { getStopPoints } from './helpers.ts';

describe('text-flow-field/helpers', () => {
  it('Should generate proper stop points for color array', () => {
    // Given
    const colors = ['red', 'blue', 'fuchsia'];
    const expected = [.3, .5, .7];
    // When
    const stopPoints = getStopPoints(colors);
    // Then
    expect(stopPoints).toEqual(expected);

    const colors2 = ['red', 'blue', 'fuchsia', 'green'];
    const expected2 = [.25, .5, .75, 1];
const stopPoints2 = getStopPoints(colors2);
  })
})
