import { alphabet } from "../constants/alphabet";

export const decrypt = (cipherText, gamma) => {
  const n = alphabet.length;
  let decryptedText = "";

  for (let i = 0; i < cipherText.length; i++) {
    const cipherChar = cipherText[i].toLowerCase(); // Зводимо до нижнього регістру
    const keyChar = gamma[i % gamma.length].toLowerCase();
    const c = alphabet.indexOf(cipherChar);
    const k = alphabet.indexOf(keyChar);

    if (c === -1 || k === -1) continue; // Пропускаємо символи, що не входять до алфавіту

    const m = (c - k + n) % n;
    decryptedText += alphabet[m];
  }

  return decryptedText;
};