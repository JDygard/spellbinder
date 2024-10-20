export const letterRarity = (letter: string) => {
    const commonLetters = 'ETAONRIS';
    const rareLetters = 'JKQXZ';
  
    if (commonLetters.includes(letter)) {
      return { value: 1, color: 'copper' };
    } else if (rareLetters.includes(letter)) {
      return { value: 3, color: 'gold' };
    } else {
      return { value: 2, color: 'silver' };
    }
  };
  