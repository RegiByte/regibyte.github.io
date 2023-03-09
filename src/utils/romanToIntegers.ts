/** A program that converts roman numerals to integers
 * With good and descriptive variable names */

export const romanToIntegers = (romanNumeral: string): number => {
  const romanNumeralMap = new Map([
    ["I", 1],
    ["V", 5],
    ["X", 10],
    ["L", 50],
    ["C", 100],
    ["D", 500],
    ["M", 1000],
  ]);

  let total = 0;
  let previousValue = 0;

  for (let i = romanNumeral.length - 1; i >= 0; i--) {
    const currentValue = romanNumeralMap.get(romanNumeral[i]) as number;

    if (currentValue < previousValue) {
      total -= currentValue;
    } else {
      total += currentValue;
    }

    previousValue = currentValue;
  }

  return total;
}