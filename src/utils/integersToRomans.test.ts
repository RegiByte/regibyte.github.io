/** A test that validates the implementation of the integersToRomans
 * function in path ./integersToRomans.test.ts
 */

import { integersToRomans } from './integersToRomans';

import { it, describe, expect } from 'vitest';

describe('integersToRomans', () => {
  it('should convert integers to roman numerals', () => {
    expect(integersToRomans(1)).toBe('I');
    expect(integersToRomans(2)).toBe('II');
    expect(integersToRomans(3)).toBe('III');
    expect(integersToRomans(4)).toBe('IV');
    expect(integersToRomans(5)).toBe('V');
    expect(integersToRomans(6)).toBe('VI');
    expect(integersToRomans(7)).toBe('VII');
    expect(integersToRomans(8)).toBe('VIII');
    expect(integersToRomans(9)).toBe('IX');
    expect(integersToRomans(10)).toBe('X');
    expect(integersToRomans(11)).toBe('XI');
    expect(integersToRomans(12)).toBe('XII');
    expect(integersToRomans(13)).toBe('XIII');
    expect(integersToRomans(14)).toBe('XIV');
    expect(integersToRomans(15)).toBe('XV');
    expect(integersToRomans(16)).toBe('XVI');
    expect(integersToRomans(17)).toBe('XVII');
    expect(integersToRomans(18)).toBe('XVIII');
    expect(integersToRomans(19)).toBe('XIX');
    expect(integersToRomans(20)).toBe('XX');
    expect(integersToRomans(21)).toBe('XXI');
    expect(integersToRomans(22)).toBe('XXII');
    expect(integersToRomans(23)).toBe('XXIII');
    expect(integersToRomans(24)).toBe('XXIV');
    expect(integersToRomans(25)).toBe('XXV');
    expect(integersToRomans(26)).toBe('XXVI');
    expect(integersToRomans(27)).toBe('XXVII');
    expect(integersToRomans(28)).toBe('XXVIII');
    expect(integersToRomans(29)).toBe('XXIX');
    expect(integersToRomans(30)).toBe('XXX');
    expect(integersToRomans(31)).toBe('XXXI');
    expect(integersToRomans(32)).toBe('XXXII');
    expect(integersToRomans(33)).toBe('XXXIII');
    expect(integersToRomans(34)).toBe('XXXIV');
    expect(integersToRomans(300)).toBe('CCC');
    expect(integersToRomans(1999)).toBe('MCMXCIX');
    expect(integersToRomans(2122)).toBe('MMCXXII');
    expect(integersToRomans(2020)).toBe('MMXX');
    expect(integersToRomans(2023)).toBe('MMXXIII');
    expect(integersToRomans(3023)).toBe('MMMXXIII');
    // beyond 3999, the roman numeral system breaks down
    // this is the largest number that can be represented in roman numerals without
    // using a bar over the numeral
    // https://en.wikipedia.org/wiki/Roman_numerals#Roman_numerals_in_computer_input
    expect(integersToRomans(4000)).toBe('MMMM');
    expect(integersToRomans(4001)).toBe('MMMMI');
    // these are invalid calculations just to demonstrate that the function
    // will return a string of invalid roman numerals
  });
});
