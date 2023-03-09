/** A code that tests the romanToIntegers function on path: ./romanToIntegers.ts */

import { romanToIntegers } from './romanToIntegers';
import { it, describe, expect } from 'vitest';

describe('romanToIntegers', () => {
  it('should convert roman numerals to integers', () => {
    expect(romanToIntegers('I')).toBe(1);
    expect(romanToIntegers('II')).toBe(2);
    expect(romanToIntegers('III')).toBe(3);
    expect(romanToIntegers('IV')).toBe(4);
    expect(romanToIntegers('V')).toBe(5);
    expect(romanToIntegers('VI')).toBe(6);
    expect(romanToIntegers('VII')).toBe(7);
    expect(romanToIntegers('VIII')).toBe(8);
    expect(romanToIntegers('IX')).toBe(9);
    expect(romanToIntegers('X')).toBe(10);
    expect(romanToIntegers('XI')).toBe(11);
    expect(romanToIntegers('XII')).toBe(12);
    expect(romanToIntegers('XIII')).toBe(13);
    expect(romanToIntegers('XIV')).toBe(14);
    expect(romanToIntegers('XV')).toBe(15);
    expect(romanToIntegers('XVI')).toBe(16);
    expect(romanToIntegers('XVII')).toBe(17);
    expect(romanToIntegers('XVIII')).toBe(18);
    expect(romanToIntegers('XIX')).toBe(19);
    expect(romanToIntegers('XX')).toBe(20);
    expect(romanToIntegers('XXI')).toBe(21);
    expect(romanToIntegers('XXII')).toBe(22);
    expect(romanToIntegers('XXIII')).toBe(23);
    expect(romanToIntegers('XXIV')).toBe(24);
    expect(romanToIntegers('XXV')).toBe(25);
    expect(romanToIntegers('XXVI')).toBe(26);
    expect(romanToIntegers('XXVII')).toBe(27);
    expect(romanToIntegers('XXVIII')).toBe(28);
    expect(romanToIntegers('XXIX')).toBe(29);
    expect(romanToIntegers('XXX')).toBe(30);
    expect(romanToIntegers('XXXI')).toBe(31);
    expect(romanToIntegers('XXXII')).toBe(32);
    expect(romanToIntegers('XXXIII')).toBe(33);
    expect(romanToIntegers('XXXIV')).toBe(34);
    expect(romanToIntegers('XXXV')).toBe(35);
    expect(romanToIntegers('XXXVI')).toBe(36);
    // Now jump to higher numbers
    expect(romanToIntegers('LXXXIX')).toBe(89);
    expect(romanToIntegers('XC')).toBe(90);
    expect(romanToIntegers('XCI')).toBe(91);
    expect(romanToIntegers('XCII')).toBe(92);
    expect(romanToIntegers('XCIII')).toBe(93);
    expect(romanToIntegers('XCIV')).toBe(94);
    // with a higher gap now
    expect(romanToIntegers('C')).toBe(100);
    expect(romanToIntegers('CI')).toBe(101);
    expect(romanToIntegers('CII')).toBe(102);
    expect(romanToIntegers('CIII')).toBe(103);
    // add random numbers to the mix
    expect(romanToIntegers('CIV')).toBe(104);
    expect(romanToIntegers('CV')).toBe(105);
    expect(romanToIntegers('CVI')).toBe(106);
  });
});
