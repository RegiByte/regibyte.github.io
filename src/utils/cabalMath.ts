const letterTable: Record<string, number> = {
  'a': 1,
  'b': 2,
  'c': 3,
  'd': 4,
  'e': 5,
  'f': 8,
  'g': 3,
  'h': 5,
  'i': 1,
  'j': 1,
  'k': 2,
  'l': 3,
  'm': 4,
  'n': 5,
  'o': 7,
  'p': 8,
  'q': 1,
  'r': 2,
  's': 3,
  't': 4,
  'u': 6,
  'v': 6,
  'w': 6,
  'x': 6,
  'y': 1,
  'z': 7,
  'ç': 6,
  'á': 3,
  'à': 3,
  'ã': 4,
  'â': 8,
  'é': 7,
  'è': 7,
  'ê': 12,
  'í': 3,
  'ì': 3,
  'î': 8,
  'ó': 9,
  'ò': 9,
  'õ': 10,
  'ô': 14,
  'ú': 8,
  'ù': 8,
  'û': 13,
  ' ': 0,
}

const letterToCabalNumber = (letter: string): number => {
  return letterTable[letter] ?? 0;
}

export const stringToCabalNumber = (str: string): number => {
  return str.split('').reduce((acc, letter) => {
    return acc + letterToCabalNumber(letter);
  }, 0);
}

export const nameToCabalNumber = (name: string): number => {
  const nameTotal = stringToCabalNumber(name.toLowerCase());
  return String(nameTotal).split('').reduce((acc, digit) => {
    return acc + Number(digit);
  }, 0)
}
