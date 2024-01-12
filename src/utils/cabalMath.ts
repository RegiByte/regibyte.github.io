const letterTable: Record<string, number> = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 5,
  f: 8,
  g: 3,
  h: 5,
  i: 1,
  j: 1,
  k: 2,
  l: 3,
  m: 4,
  n: 5,
  o: 7,
  p: 8,
  q: 1,
  r: 2,
  s: 3,
  t: 4,
  u: 6,
  v: 6,
  w: 6,
  x: 6,
  y: 1,
  z: 7,
  ç: 6,
  á: 3,
  à: 3,
  ã: 4,
  â: 8,
  é: 7,
  è: 7,
  ê: 12,
  í: 3,
  ì: 3,
  î: 8,
  ó: 9,
  ò: 9,
  õ: 10,
  ô: 14,
  ú: 8,
  ù: 8,
  û: 13,
  ' ': 0,
};

const vogalLetters = [
  'a',
  'e',
  'i',
  'o',
  'u',
  'á',
  'à',
  'ã',
  'â',
  'é',
  'è',
  'ê',
  'í',
  'ì',
  'î',
  'ó',
  'ò',
  'õ',
  'ô',
  'ú',
  'ù',
  'û',
];

const letterToCabalNumber = (letter: string): number => {
  return letterTable[letter] ?? 0;
};

export const isValidLetter = (letter: string): boolean => {
  return letterTable[letter] !== undefined;
};

export const stringToCabalNumber = (str: string): number => {
  return str.split('').reduce((acc, letter) => {
    return acc + letterToCabalNumber(letter);
  }, 0);
};

export const nameToCabalNumber = (name: string): number => {
  const nameTotal = stringToCabalNumber(name.toLowerCase());
  return String(nameTotal)
    .split('')
    .reduce((acc, digit) => {
      return acc + Number(digit);
    }, 0);
};

export const nameToMotivation = (name: string): number => {
  const vogals = name
    .toLowerCase()
    .split('')
    .filter((letter) => {
      return vogalLetters.includes(letter);
    })
    .join('');
  let cabalNumber = stringToCabalNumber(vogals);
  if (cabalNumber > 9 && cabalNumber !== 11 && cabalNumber !== 22) {
    cabalNumber = reduceNumberToDigit(cabalNumber, 9, [11, 22]);
  }
  return cabalNumber;
};

export const reduceNumberToDigit = (
  number: number,
  max = 9,
  excludes = [11, 22],
): number => {
  let cabalNumber = number;

  while (cabalNumber > max && !excludes.includes(cabalNumber)) {
    cabalNumber = String(cabalNumber)
      .split('')
      .reduce((acc, digit) => {
        return acc + Number(digit);
      }, 0);
  }

  return cabalNumber;
};

export const nameToImpression = (name: string): number => {
  const consonants = name
    .toLowerCase()
    .split('')
    .filter((letter) => {
      return !vogalLetters.includes(letter) && isValidLetter(letter);
    })
    .join('');

  let cabalNumber = stringToCabalNumber(consonants);
  if (cabalNumber > 9) {
    cabalNumber = reduceNumberToDigit(cabalNumber, 9, []);
  }
  return cabalNumber;
};
