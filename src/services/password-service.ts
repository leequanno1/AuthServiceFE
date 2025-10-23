export const createPassword = (length = 12): string => {
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const digits = "0123456789";
  const symbols = "!@#$%^&*()-_=+[]{}<>?,.";
  const all = lower + upper + digits + symbols;

  const randInt = (max: number) => {
    if (typeof crypto !== "undefined" && "getRandomValues" in crypto) {
      return crypto.getRandomValues(new Uint32Array(1))[0] % max;
    }
    return Math.floor(Math.random() * max);
  };

  const pick = (charset: string) => charset[randInt(charset.length)];

  // Ensure at least one character from each category when possible
  const categories = [lower, upper, digits, symbols];
  const result: string[] = [];

  const requiredCount = Math.min(length, categories.length);
  for (let i = 0; i < requiredCount; i++) {
    result.push(pick(categories[i]));
  }

  for (let i = result.length; i < length; i++) {
    result.push(pick(all));
  }

  // Shuffle (Fisher–Yates) using secure randomness when available
  for (let i = result.length - 1; i > 0; i--) {
    const j = randInt(i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result.join("");
};
